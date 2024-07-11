import model from "../models/discountCode.js";
import validator from "../validators/discountCode.js"

const create = async (request, response, next) => {
  try {
    const body = Object.fromEntries(Object.entries(request.body).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
    
    await validator.create.validate(body);

    await model.create({ ...body, expiresAt: Date.now() + 1000 * 60 * 60 * body.expiresAt, creator: request.user._id });

    response.status(201).json({ message: "کد تخفیف مورد نظر با موفقیت ثبت شد." });
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length } = request.query;

    const discountCodes = await model.find({}, "-categories -__v").populate({ path: "creator", select: "firstName lastName" }).sort({ createdAt: -1 }).lean();

    if (discountCodes.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || discountCodes.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageDiscountCodes = discountCodes.slice(startIndex, endIndex);

      if (currentPageDiscountCodes.length) {
        return response.json({ discountCodes: currentPageDiscountCodes, total: discountCodes.length, nextPage: endIndex < discountCodes.length ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("کد تخفیفی پیدا نشد."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const use = async (request, response, next) => {
  try {
    const { code } = request.params;
    
    const body = Object.fromEntries(Object.entries(request.body).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
    
    await validator.use.validate(body);

    const discountCode = await model.findOne({ code });

    if (discountCode) {
      const isIncludes = body.categories.every((category) => discountCode.categories.includes(category));

      if (isIncludes) {
        if (body.price >= discountCode.minimumPrice) {
          if (discountCode.usages < discountCode.maximumUsage) {
            if (discountCode.expiresAt > new Date()) {
              await model.findByIdAndUpdate(discountCode._id, { $inc: { usages: 1 } });

              response.json({ message: "کد تخفیف مورد نظر با موفقیت اعمال شد.", discountCode });
            } else {
              throw Object.assign(new Error("کد تخفیف مورد نظر منقضی شده است."), { status: 410 });
            }
          } else {
              throw Object.assign(new Error("حداکثر محدودیت استفاده از کد تخفیف مورد نظر به اتمام رسیده است."), { status: 403 });
          }
        } else {
          throw Object.assign(new Error("مبلغ کل محصول(ها) کمتر از حداقل مبلغ مورد نیاز برای استفاده از کد تخفیف مورد نظر است."), { status: 409 });
        }
      } else {
        throw Object.assign(new Error("کد تخفیف مورد نظر شامل این محصول(ها) نمی‌باشد."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("کد تخفیف مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await model.findByIdAndDelete(id);

    if (result) {
      response.json({ message: "کد تخفیف مورد نظر با موفقیت حذف شد." });
    } else {
      throw Object.assign(new Error("کد تخفیف مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, use, remove };