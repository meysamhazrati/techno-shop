import { Link } from "react-router-dom";
import Section from "./Section";

const Landing = () => {
  return (
    <Section className="flex flex-col-reverse items-center gap-y-10 lg:flex-row [&>*]:w-full lg:[&>*]:w-1/2">
      <div className="flex flex-col items-center gap-y-5 text-center lg:items-start lg:gap-y-7 lg:text-right">
        <h1 className="max-w-[322px] font-vazirmatn-black text-4xl sm:max-w-[430px] sm:text-5xl/tight md:max-w-[537px] md:text-6xl/tight lg:max-w-[371px] lg:text-5xl/tight xl:max-w-[463px] xl:text-6xl/tight">با ما به دنیای تکنولوژی سفر کنید!</h1>
        <p className="max-w-[368px] sm:max-w-[460px] sm:text-xl/7 md:max-w-[552px] md:text-2xl/9 lg:text-xl/7 xl:text-2xl/9">تکنوشاپ یک فروشگاه آنلاین کالای دیجیتال با تنوع محصول بسیاری از جمله موبایل، لپ‌تاپ، کامپیوتر و... هست که در عصر تکنولوژی امروزی، همه ما به آن ها نیاز داریم.</p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-white">
          <Link to="products" className="flex h-10 w-28 items-center justify-center rounded-3xl bg-primary-900 text-sm transition-colors hover:bg-primary-800 sm:h-11 sm:w-36 sm:text-base md:h-12 md:w-40 md:text-xl lg:h-11 lg:w-36 lg:text-base xl:h-12 xl:w-40 xl:text-xl">فروشگاه</Link>
          <Link to="/me/tickets" className="flex h-10 w-28 items-center justify-center rounded-3xl bg-primary-500 text-sm transition-colors hover:bg-primary-600 sm:h-11 sm:w-36 sm:text-base md:h-12 md:w-40 md:text-xl lg:h-11 lg:w-36 lg:text-base xl:h-12 xl:w-40 xl:text-xl">ارتباط با ما</Link>
        </div>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500">
          <path d="M706.44,270.9c-2.82-32.64-12.57-64.71-26.6-94.42C638,87.76,551.91,10.26,448.74,14.16,382.58,16.67,317,25.23,251.16,32c-56.17,5.8-112,11.1-156.28,50.11a164.19,164.19,0,0,0-44,61.81c-26.36,66-6.66,143.93,35.93,200.83s105,95.72,169.16,126.3c26.17,12.46,55.52,24,83.44,16.24,17.19-4.79,31.6-16.41,47.91-23.64,54.9-24.34,118.56,4.29,178.29-1.88a154.18,154.18,0,0,0,94.25-45.91c29.58-30.67,45.25-73.24,47.24-115.8A220.19,220.19,0,0,0,706.44,270.9Z" fill="#0279D9" />
          <path d="M706.44,270.9c-2.82-32.64-12.57-64.71-26.6-94.42C638,87.76,551.91,10.26,448.74,14.16,382.58,16.67,317,25.23,251.16,32c-56.17,5.8-112,11.1-156.28,50.11a164.19,164.19,0,0,0-44,61.81c-26.36,66-6.66,143.93,35.93,200.83s105,95.72,169.16,126.3c26.17,12.46,55.52,24,83.44,16.24,17.19-4.79,31.6-16.41,47.91-23.64,54.9-24.34,118.56,4.29,178.29-1.88a154.18,154.18,0,0,0,94.25-45.91c29.58-30.67,45.25-73.24,47.24-115.8A220.19,220.19,0,0,0,706.44,270.9Z" fill="#ffffff" opacity="0.7" />
          <line x1="226.03" y1="61.56" x2="235.52" y2="71.05" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />              
          <line x1="235.52" y1="61.56" x2="226.03" y2="71.05" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="698.81" y1="236.85" x2="708.3" y2="246.34" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="708.3" y1="236.85" x2="698.81" y2="246.34" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="150.97" y1="389.42" x2="160.46" y2="398.91" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="160.46" y1="389.42" x2="150.97" y2="398.91" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="434.92" y1="26.74" x2="444.41" y2="36.23" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="444.41" y1="26.74" x2="434.92" y2="36.23" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="441.04" y1="461.38" x2="450.53" y2="470.87" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="450.53" y1="461.38" x2="441.04" y2="470.87" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="542.14" y1="426.56" x2="549.63" y2="434.06" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="549.63" y1="426.56" x2="542.14" y2="434.06" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="667.34" y1="49.73" x2="674.83" y2="57.22" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="674.83" y1="49.73" x2="667.34" y2="57.22" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M349.9,74.31a6,6,0,1,0-6,6A6,6,0,0,0,349.9,74.31Z" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M62.84,53.83a6,6,0,1,0-6,6A6,6,0,0,0,62.84,53.83Z" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M653.86,417.35a6,6,0,1,0-6,6A6,6,0,0,0,653.86,417.35Z" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M161.32,473.66a6,6,0,1,0-6,6A6,6,0,0,0,161.32,473.66Z" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M63.18,244.29a6,6,0,1,0-6,6A6,6,0,0,0,63.18,244.29Z" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M353.83,364.1a6,6,0,1,0-6,6A6,6,0,0,0,353.83,364.1Z" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="724.01" y1="360.37" x2="735.05" y2="362.25" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="167.62 375.48 504.76 322.99 716.97 359.17" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="20.83" y1="398.34" x2="152.96" y2="377.76" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="591.71 80.61 387.81 105.15 388.21 359.59 593.7 392.35 683.5 373.74 683.9 91.81 591.71 80.61" fill="#dbdbdb" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="674.23" y1="365.87" x2="608.89" y2="356" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="634.87" cy="161.58" rx="29.44" ry="40.42" fill="#ffffff" />
          <ellipse cx="634.87" cy="161.58" rx="26.66" ry="36.61" fill="#0279D9" />
          <ellipse cx="634.87" cy="161.58" rx="9.78" ry="13.43" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="572.28 157.61 447.82 161 447.82 272.18 575.11 286.04 575.11 160.16 572.28 157.61" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="437.99" cy="207.36" rx="29.44" ry="40.42" fill="#ffffff" />
          <ellipse cx="437.99" cy="207.36" rx="26.66" ry="36.61" fill="#0279D9" />
          <ellipse cx="437.99" cy="207.36" rx="9.78" ry="13.43" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="634.87" cy="243.74" rx="29.44" ry="40.42" fill="#ffffff" />
          <ellipse cx="634.87" cy="243.74" rx="26.66" ry="36.61" fill="#0279D9" />
          <ellipse cx="634.87" cy="243.74" rx="9.78" ry="13.43" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="634.87" cy="325.91" rx="29.44" ry="40.42" fill="#ffffff" />
          <ellipse cx="634.87" cy="325.91" rx="26.66" ry="36.61" fill="#0279D9" />
          <ellipse cx="634.87" cy="325.91" rx="9.78" ry="13.43" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M528.43,201.31a3.51,3.51,0,0,1-1.57-.37c-4.82-2.41-12-9.77-17-17.5-4.84-7.42-9.85-18.3-6.22-27.92,1.77-4.69,8.87-12.6,49.93-27.23,22-7.83,43.58-13.91,43.79-14a3.54,3.54,0,1,1,1.91,6.81c-34.87,9.78-85.55,27.69-89,36.88-2.73,7.22,2.29,16.62,5.52,21.57,5.22,8,11.59,13.71,14.25,15a3.53,3.53,0,0,1-1.59,6.69Z" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M525.89,222.25a3.49,3.49,0,0,1-2-.61c-10-6.78-13.8-20.95-11.15-42.12,1.21-9.73,5.78-18.53,14-26.89,11-11.23,28.82-21.79,53-31.4,54-21.42,79.33-14.28,80.39-14a3.53,3.53,0,0,1-2,6.77c-.34-.09-24.57-6.56-75.77,13.76-39.65,15.73-60.12,32.94-62.58,52.6-2.29,18.31.43,30.22,8.09,35.38a3.54,3.54,0,0,1-2,6.47Z" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="521.91 252.17 521.91 258.3 544.14 258.3 547.21 254.47 556.79 254.47 556.79 174.37 547.21 172.45 542.61 168.24 524.98 168.24 521.91 177.44 521.91 252.17" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="521.91" y="177.43" width="15.71" height="74.73" fill="#0279D9" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="584 214.61 547.59 211.93 547.59 246.03 582.46 251.02 584 214.61" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="548" y1="216.08" x2="583.56" y2="219.11" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="547.62" y1="221.94" x2="583.37" y2="225.92" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="547.81" y1="227.62" x2="583" y2="231.78" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="547.62" y1="233.29" x2="583" y2="237.83" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="547.24" y1="238.21" x2="582.43" y2="243.13" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="547.43" y1="242.75" x2="582.24" y2="248.24" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="547.59 211.93 547.59 191.3 549.89 192.62 549.89 211.92 547.59 211.93" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="407.63 261.43 407.63 345.44 413.44 346.05 413.44 262.35 407.63 261.43" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="413.44 262.35 482.01 258.81 482.01 268.6 584.56 279.93 584.56 316.05 566.2 321.26 481.09 310.24 481.09 331.66 580.89 346.36 580.89 374.21 413.44 346.05 413.44 262.35" fill="#ababab" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="482.01 268.6 413.13 273.37 548.13 283.3 584.56 279.93 482.01 268.6" fill="#ababab" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="548.13 283.3 548.13 318.5 566.2 321.26 584.56 316.05 584.56 279.93 548.13 283.3" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="413.13 273.37 413.13 303.96 481.09 310.24 548.13 318.5 548.13 283.3 413.13 273.37" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="441.69 305.51 449.34 291.18 504.28 296.67 508.1 300.73" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M515.07,287s-7,3.67-5.51,17.76,15.31,32.14,25.72,38.57,34.89,10.1,38.57,9.79,5.81-.61,5.81-.61V338.4a39.59,39.59,0,0,1-18.36,0c-9.49-2.45-27.86-28.47-30-34s2.75-11.33,2.75-11.33V288.5Z" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M524.26,288.2s-6.13,3.06-3.37,16.53,14.39,29.69,27.55,38.26,25.1,6.74,25.1,6.74" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M534.05,288.5a17.72,17.72,0,0,0-5.83,14.06c.49,8.93,14.39,23.57,20.47,30" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M526.48,290.77s-3,5.46-1.24,15,17.49,28.29,27.92,35" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M518.91,287.17s-3.6,1.86-3.23,12.28,8.69,27.43,19.61,38.35" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M512.21,301.44S511,312,522.76,328.37" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M558,341.77a152.88,152.88,0,0,0,20.59,3" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="407.63 261.43 454.98 258.07 482.01 258.81 413.44 262.35 407.63 261.43" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="413.86 323.03 465.91 316.08 465.91 329.39 413.66 340.11 413.44 346.05 481.09 331.66 481.09 310.24 461.54 308.53 413.46 311.71 413.86 323.03" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M417.33,350.9v12.42c0,3.16,19.84,5.73,44.31,5.73S506,366.48,506,363.32V350.9Z" fill="#ffffff" />
          <ellipse cx="461.64" cy="350.9" rx="44.31" ry="5.73" fill="#0279D9" />
          <path d="M469.64,349.82c0,1-5.24,1.79-11.7,1.79s-11.71-.8-11.71-1.79,5.24-1.79,11.71-1.79S469.64,348.83,469.64,349.82Z" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M512.12,358.22l-.36,12.42c-.09,3.17,19.67,10.13,44.13,10.83s44.37-1.29,44.46-4.46l.35-16.24Z" fill="#ffffff" />
          <path d="M600.7,360.77c-.09,3.17-20,5.16-44.45,4.46s-44.22-3.84-44.13-7,20-5.16,44.46-4.45S600.79,357.61,600.7,360.77Z" fill="#0279D9" />
          <path d="M564.44,358.65c0,1-5.29,1.64-11.75,1.46S541,359,541,358s5.29-1.64,11.75-1.45S564.47,357.66,564.44,358.65Z" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="412.76 103.42 412.76 117.23 465.45 123.66 629.94 109.52 629.94 88.32 591.71 80.61 412.76 103.42" fill="#263238" />
          <polygon points="412.76 117.23 573.72 99.88 629.94 109.52 465.45 123.66 412.76 117.23" fill="#ffffff" />
          <rect x="490.82" y="197.5" width="27.72" height="35.64" rx="7.11" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="495.47" y="203.47" width="18.42" height="23.68" rx="5.04" fill="#0279D9" />
          <path d="M592.08,73.6,593.29,398l93-20.22.81-289.62Zm88.59,296.1-76.45,15L605,87l75.65,12.54Z" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M592.08,73.6,382.55,101.11V363.23L593.29,398ZM393.07,356l-1.62-247.56L577.92,88.17l1.22,298.92Z" fill="#707070" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="466.94" y1="128.03" x2="466.94" y2="154.82" fill="none" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M259.83,437S313,450.93,317.88,450.6s221.83-46.37,223.45-47.35,4.22-6.16,4.22-6.16l-7.79-2.92s-71.35-13.94-74.91-13.29S228.37,417.2,226.1,419.47s-5.51,4.54-4.54,5.51S259.83,437,259.83,437Z" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="235.18 423.04 311.33 440.86 537.05 395.09" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="315.46 442.79 318.77 444.99 542.34 398.4" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="248.91 423.21 251.72 420.66 308.31 434.43 308.57 438.51" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="308.31 434.43 318.47 432.92 321.63 436.8" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="322.6 436.19 323.57 432.79 332.18 430.73 335.09 434.01 336.3 430.37 356.92 426.25 359.96 429.88" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="363.11 428.43 364.69 425.15 372.21 423.21 375.36 426.61" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="376.57 426.12 377.54 422.36 383.49 421.15 386.64 423.45 388.46 420.18 395.13 419.09 397.44 421.03" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="251.72 420.66 260.86 419.33 263.65 420.3 264.74 418 267.17 417.75 271.41 417.75 274.57 417.03 277.11 415.45 283.54 415.45 288.76 415.33 289.85 413.99 297.49 412.9 302.58 413.75 305.13 410.6 312.77 410.23 315.44 410.36 317.26 409.02 337.03 405.99 341.03 406.47 343.1 404.17 361.05 401.99 368.2 403.08 369.66 404.9" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="355.59" y1="408.29" x2="367.84" y2="405.75" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="370.75 405.63 387.36 409.9 375.85 412.66 359.35 409.26" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="375.84" y1="412.66" x2="375.84" y2="418.6" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="395.13 419.09 384.58 416.66 378.03 417.39 377.18 419.33" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="383.49 421.15 371.72 418.6 367.6 420.3 366.99 421.27" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="377.54" y1="422.36" x2="370.99" y2="420.91" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="388.46" y1="420.18" x2="380.58" y2="418.72" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="364.69 425.15 354.62 421.76 362.87 420.54 371.24 422.36" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="353.77 416.66 361.65 419.09 369.78 417.27 362.26 414.84 353.77 416.66" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="353.77 416.66 350.98 419.69 354.38 420.91" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="369.78" y1="417.27" x2="371.72" y2="418.6" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="356.92" y1="426.24" x2="306.22" y2="414.6" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="266.2" y1="421.03" x2="316.29" y2="432.55" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="267.77" y1="419.21" x2="321.99" y2="431.95" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="275.66" y1="418.12" x2="330.24" y2="430" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="288.52 416.18 332.06 425.88 342 423.94" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="379.03 417.38 381.1 412.94 406.68 407.84 414.42 409.73 515.97 391.43 525.62 393.09 529.06 396.31" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="525.62 393.09 425.42 413.4 426.53 416.62" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="430.63 406.96 439.95 409.96 442.5 412.62" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="444.17 404.3 454.82 407.52 456.82 409.85" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="498.21 394.87 507.2 396.98 509.31 398.75" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="509.86 392.87 517.3 395.09 518.74 396.98" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="391.57 417.28 393.79 414.84 403.33 417.62 421.53 414.18 412.32 411.18" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="421.53" y1="414.18" x2="422.97" y2="417.28" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="425.42" y1="413.4" x2="417.76" y2="410.85" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="393.79" y1="414.84" x2="409.88" y2="411.74" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="381.92" y1="413.51" x2="387.8" y2="415.29" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="287.08 420.27 288.49 418.39 293.2 417.33" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="298.63 423.22 299.8 421.33 304.05 420.04" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="311.82 425.22 313 424.04 318.42 423.1" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="294.74" y1="430.64" x2="299.45" y2="429.23" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="285.54" y1="428.29" x2="288.73" y2="427.11" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="262.45" y1="422.39" x2="267.98" y2="421.92" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="271.05" y1="424.52" x2="276.82" y2="423.81" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="316.66 416.97 319.37 414.62 325.73 416.27 325.73 417.68" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="326.67 416.38 333.51 414.85 335.98 416.62 337.51 413.56 344.7 412.02 347.53 414.73 349.18 411.67 356.49 410.49 359.32 413.08" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="321.84 413.79 348.95 408.61 354.01 409.67" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="333.51" y1="414.85" x2="328.44" y2="412.85" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="337.51" y1="413.56" x2="332.8" y2="412.26" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="349.18" y1="411.67" x2="342.94" y2="410.37" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="315.44" y1="410.36" x2="325.49" y2="412.97" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="318.07" y1="409.31" x2="329.5" y2="412.38" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="327.03" y1="408.13" x2="336.81" y2="411.08" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="330.68 407.31 340.11 410.73 344.7 412.02" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="342.11" y1="406.96" x2="346.59" y2="408.25" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="343.1 404.17 352.95 406.25 353.66 408.72" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="363.68" y1="401.06" x2="471.39" y2="383.5" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="373.14" y1="404.3" x2="482.9" y2="385.75" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="381.55" y1="407.28" x2="494.8" y2="387.5" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="409.55" y1="406.93" x2="506.53" y2="389.6" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="455.56" y1="385.93" x2="499.74" y2="394" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="466.43" y1="384.41" x2="506.17" y2="392.48" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="483.26" y1="397.39" x2="449.13" y2="387.69" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="472.16" y1="399.49" x2="441.19" y2="389.79" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="454.98" y1="402.76" x2="425.17" y2="391.78" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="445.51" y1="404.52" x2="416.52" y2="393.41" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="434.76" y1="406.5" x2="406.59" y2="394.93" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="422.84" y1="408.37" x2="396.07" y2="396.45" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="407.41" y1="408.49" x2="385.2" y2="398.21" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="397.01" y1="409.78" x2="375.15" y2="399.72" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="292.29" y1="411.53" x2="294.86" y2="408.61" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="303.86" y1="407.09" x2="308.88" y2="408.96" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="314.61" y1="405.57" x2="319.99" y2="407.32" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="327.47" y1="403.11" x2="334.24" y2="405.45" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="340.09" y1="401.01" x2="347.45" y2="402.76" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="350.37" y1="399.26" x2="357.85" y2="401.59" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="361.59" y1="397.39" x2="367.44" y2="399.14" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="387.31" y1="393.41" x2="392.21" y2="394.93" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="397.59" y1="391.66" x2="403.2" y2="393.06" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="406.71" y1="390.02" x2="412.32" y2="391.08" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="419.45" y1="388.27" x2="425.41" y2="390.02" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="430.9" y1="386.52" x2="437.68" y2="387.92" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="439.43" y1="384.88" x2="446.21" y2="386.52" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="449.02" y1="383.48" x2="454.74" y2="385" fill="none" stroke="#b8b8b8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M266,442.17S254.31,426.93,235.18,423s-29.51,2.92-38.92,8.11-18.48,9.4-17.51,13.29a14.1,14.1,0,0,0,7.13,8.76c2.92,1.3,31.14,11.35,44.44,12.65s29.18-2.27,34.05-7.14S266,442.17,266,442.17Z" fill="#a3a3a3" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M263.05,438.88c-4.59-4.71-14.37-13.1-27.87-15.84-19.13-3.89-29.51,2.92-38.92,8.11-1.79,1-3.56,1.93-5.26,2.85,2-.47,15.84-3.54,22.45.06,7.14,3.9,20.11,9.41,34.05,9.41C255.43,443.47,260.31,441.17,263.05,438.88Z" fill="#707070" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M266.91,452.64a37.11,37.11,0,0,1-21,5.42c-18.48-.65-25.94-12.65-37.62-19.13s-29.51,5.51-29.51,5.51a14.1,14.1,0,0,0,7.13,8.76c2.92,1.3,31.14,11.35,44.44,12.65s29.18-2.27,34.05-7.14A10.16,10.16,0,0,0,266.91,452.64Z" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="74.71 87.63 69.8 90.59 96.89 350.8 101.39 348.91 74.71 87.63" fill="#a3a3a3" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M229.47,335l-21.2,61.54,49.06-10.45s-8.71-6.09-7.54-15.38,13.06-37.74,13.06-37.74Z" fill="#a3a3a3" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M249.79,370.67c1.16-9.29,13.06-37.74,13.06-37.74l-23.49,1.43c-1.88,5.42-12.57,35-13.09,43.28a15.59,15.59,0,0,0,6.14,13.72l24.92-5.31S248.62,380,249.79,370.67Z" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="74.71 87.63 101.39 348.91 404.46 320.72 377.78 122.87 74.71 87.63" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="85.28 98.2 110.96 337.33 394.9 312.67 372.25 132.43 85.28 98.2" fill="#0279D9" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="254.31" cy="188.55" rx="23.98" ry="28.48" transform="translate(-60.8 158.06) rotate(-31.03)" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="253.73" cy="176.86" rx="7.82" ry="9.92" transform="translate(-55.48 183.58) rotate(-36.12)" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M278.87,198.84c-7.35-8.36-17.63-13.39-27-12.22s-15.09,8-16.14,17.27c6.81,9,17.67,13.85,27.61,11.38C271.45,213.26,277,206.9,278.87,198.84Z" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="304.22 243.07 218.65 243.07 216.3 228.17 301.86 228.17 304.22 243.07" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="96.89 350.8 403.05 322.32 404.46 320.72 101.39 348.91 96.89 350.8" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M191.32,421.6s6.44-6.13,12.72-9,32.77-12.86,63-15.26,101.74-3.74,106.53-3.89,10.33-.6,10.92-2.24.87-9,.87-9l-21.19,7.84-2.12-2s-23.34-2.25-66.13,1.19-68.83,10-86.33,15.56S191.32,421.6,191.32,421.6Z" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M165.89,409.86l27,9.29s10.16-14.81,59.51-22.65,111.76-6.38,111.76-6.38l21.19-7.84s-81-4.64-133.53,2.32S172.57,401.73,165.89,409.86Z" fill="#707070" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M165.89,409.86s-8.71,10.74-6.38,11.61,28.73,1.16,30.77.29a4.79,4.79,0,0,0,2.61-2.61Z" fill="#263238" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M65,422l5.31,44.7c0,8.25,13.85,14.94,30.93,14.94s30.93-6.69,30.93-14.94l5.31-44.7Z" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="101.28" cy="422.01" rx="36.24" ry="10.26" fill="#ffffff" stroke="#263238" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="101.28" cy="422.01" rx="28.24" ry="8" fill="#263238" />
          <path d="M39,321.75c3.35.92,11-.37,11-.37s-2.39-4.82-2.58-5.1c-2.21-3.3-8.41-8.37-12.68-7.15a5.27,5.27,0,0,0-3.24,7.13C32.74,319.17,36.16,321,39,321.75Z" fill="#263238" />
          <path d="M117.35,312.12c.07,0,.66-5.33.65-5.67,0-4-2.39-11.62-6.63-13a5.26,5.26,0,0,0-6.63,4.16c-.64,3.07,1.23,6.46,3.18,8.69C110.21,309,117.34,312.12,117.35,312.12Z" fill="#263238" />
          <path d="M136.33,280.81c-4.44.16-8.77,6.91-9.85,10.73-.09.33-1,5.66-.87,5.65l.09,0c-.69,1.06-1.42,2.2-2.19,3.47-1.4,2.35-3,5-4.48,8a92.21,92.21,0,0,0-4.41,10,68.86,68.86,0,0,0-3.3,11.74c0,.05,0,.1,0,.15-.16-1.29-.74-4.89-.82-5.16-1.07-3.82-5.38-10.58-9.82-10.75a5.26,5.26,0,0,0-5.3,5.76c.2,3.14,2.89,5.91,5.36,7.54,2.79,1.85,10,3,10.52,3.08a92.12,92.12,0,0,0-1.16,12.37c-.08,2.41-.09,4.84-.06,7.28-.18-1.11-.35-2.1-.38-2.24-1.07-3.82-5.39-10.57-9.83-10.75a5.26,5.26,0,0,0-5.29,5.77c.2,3.13,2.89,5.9,5.36,7.54s8.59,2.76,10.2,3c0,.94,0,1.88.06,2.81.11,4.49.24,9,.24,13.37,0,1.55-.06,3.08-.12,4.6-.16-1-.3-1.81-.33-1.94-1.07-3.82-5.38-10.58-9.83-10.75a5.27,5.27,0,0,0-5.29,5.77c.2,3.13,2.89,5.9,5.36,7.54s8,2.64,9.92,3c-.11,1.56-.2,3.13-.37,4.64-.14,1-.2,2-.4,3.05s-.34,2-.51,3c-.4,1.91-.8,3.89-1.23,5.74-.3,1.29-.6,2.52-.9,3.76,0-1.55,0-4.57,0-4.82a20.41,20.41,0,0,0-4.13-9.44,7.46,7.46,0,0,0-.24-1.14,5.26,5.26,0,0,0-7-3.49c-4.08,1.75-5.7,9.6-5.33,13.55,0,.23.54,2.73.89,4.31-.34-.9-.67-1.77-1-2.68-.72-1.82-1.49-3.61-2.31-5.54l-1.3-2.78c-.42-.93-1-1.87-1.46-2.82-1.17-2.18-2.47-4.33-3.82-6.46,1.59-.63,7.19-3,9.27-5.1s4.11-5.4,3.64-8.5a5.25,5.25,0,0,0-6.39-4.51c-4.31,1.11-7.09,8.62-7.33,12.58,0,.25.14,3.11.25,4.68-.82-1.28-1.64-2.55-2.51-3.82-2.53-3.65-5.2-7.27-7.84-10.89-.82-1.11-1.61-2.22-2.41-3.34.57-.22,7.29-2.84,9.62-5.23,2.07-2.12,4.11-5.4,3.64-8.5a5.28,5.28,0,0,0-6.4-4.52c-4.3,1.11-7.08,8.63-7.32,12.59,0,.3.2,4.42.31,5.46-1.76-2.45-3.49-4.91-5.1-7.4a92.08,92.08,0,0,1-5.9-10.47c.26-.1,7.29-2.81,9.68-5.25,2.06-2.13,4.11-5.4,3.64-8.51a5.27,5.27,0,0,0-6.4-4.51c-4.3,1.11-7.08,8.62-7.32,12.59,0,.26.15,3.39.26,4.88l-.24.07a67.33,67.33,0,0,1-3.94-11.42c-.56-2.15-1-4.24-1.34-6.28,1.36-.37,7.56-2.12,10-4.09s4.68-4.92,4.55-8a5.26,5.26,0,0,0-5.86-5.19c-4.4.63-8,7.79-8.66,11.71,0,.21-.17,2.41-.24,4-.15-.92-.32-1.87-.44-2.76-.48-3.33-.71-6.4-.89-9.13-.09-1.55-.15-2.95-.18-4.27,1.15-1.06,5.71-5.38,6.9-8.18s1.89-6.52.33-9.24a5.26,5.26,0,0,0-7.59-1.91c-3.61,2.59-3.5,10.6-2.29,14.38.1.33,2.32,5.25,2.38,5.2l.07-.07c0,1.27,0,2.62.09,4.11.12,2.73.29,5.82.69,9.17a95.91,95.91,0,0,0,1.82,10.75,68.48,68.48,0,0,0,3.73,11.61l.06.13c-.85-1-3.31-3.67-3.53-3.85-3-2.6-10.32-5.85-14.12-3.55a5.26,5.26,0,0,0-1.24,7.73c1.9,2.51,5.67,3.33,8.63,3.33,3.35,0,9.95-3,10.47-3.23a92.82,92.82,0,0,0,5.86,10.95c1.26,2.06,2.6,4.09,4,6.11-.76-.83-1.45-1.56-1.56-1.65-3-2.6-10.32-5.86-14.12-3.55a5.26,5.26,0,0,0-1.24,7.73c1.89,2.5,5.67,3.33,8.63,3.33s8.69-2.44,10.18-3.11c.54.77,1.06,1.55,1.6,2.32,2.57,3.68,5.15,7.34,7.57,11,.85,1.3,1.65,2.6,2.45,3.91-.68-.74-1.26-1.35-1.35-1.44-3-2.6-10.33-5.85-14.13-3.55A5.27,5.27,0,0,0,62,380.28c1.89,2.51,5.66,3.33,8.63,3.34s8.13-2.21,9.91-3c.77,1.36,1.56,2.72,2.25,4.07.45.93,1,1.8,1.35,2.76l1.24,2.81c.73,1.82,1.48,3.68,2.15,5.47.46,1.24.89,2.43,1.32,3.63-.84-1.3-2.52-3.81-2.69-4-2.57-3-9.32-7.35-13.42-5.65a5.26,5.26,0,0,0-2.39,7.46c1.49,2.76,5.09,4.15,8,4.6,3.23.49,9.94-1.36,10.78-1.6.7,2,1.37,3.92,2,5.76,2.08,6.3,3.58,11.64,4.58,15.41l3-.44a1.82,1.82,0,0,1-.07-.25c-1.1-3.79-2.74-9.19-5-15.57-.7-2-1.5-4.16-2.34-6.35a57.31,57.31,0,0,0,5.6-3.7c2.61,2.11,8.79,4.13,9.59,4.38-.51,2.05-1,4-1.53,5.89-1.74,6.41-3.44,11.68-4.68,15.38l3.27-.48c1.12-3.65,2.53-8.5,4-14.23.52-2.07,1-4.3,1.54-6.59.86.05,7.82.45,10.88-.72,2.76-1.07,6-3.19,6.86-6.2a5.26,5.26,0,0,0-3.91-6.78c-4.37-.79-10.05,4.86-11.92,8.36-.11.21-1.06,2.58-1.64,4.09.21-.94.41-1.85.61-2.81.4-1.91.75-3.83,1.13-5.89.14-1,.29-2,.44-3s.23-2.1.35-3.16c.22-2.46.32-5,.37-7.5,1.68.35,7.64,1.5,10.55.87s6.41-2.24,7.72-5.09a5.26,5.26,0,0,0-2.84-7.29c-4.2-1.45-10.67,3.29-13,6.46-.15.2-1.6,2.67-2.37,4,0-1.52,0-3,0-4.57-.09-4.44-.32-8.93-.53-13.42-.07-1.37-.12-2.74-.17-4.11.59.13,7.65,1.66,10.91.95,2.89-.63,6.41-2.24,7.72-5.09a5.25,5.25,0,0,0-2.84-7.29c-4.2-1.45-10.67,3.28-13,6.46-.18.24-2.27,3.79-2.75,4.72-.12-3-.21-6-.17-9a91.79,91.79,0,0,1,.85-12c.27.06,7.63,1.68,11,1,2.89-.63,6.41-2.24,7.73-5.09a5.26,5.26,0,0,0-2.85-7.29c-4.2-1.45-10.67,3.28-13.05,6.46-.16.21-1.75,2.91-2.47,4.22l-.24-.08a67.88,67.88,0,0,1,3-11.7c.72-2.1,1.52-4.07,2.34-6,1.34.44,7.48,2.4,10.56,2.07s6.62-1.51,8.24-4.2a5.25,5.25,0,0,0-2-7.56c-4-1.9-11,2.09-13.68,5-.14.16-1.47,1.93-2.42,3.23.39-.85.77-1.74,1.16-2.55,1.43-3,2.94-5.73,4.29-8.1.78-1.35,1.51-2.55,2.21-3.66,1.54-.25,7.73-1.34,10.27-3s5.17-4.39,5.37-7.52A5.26,5.26,0,0,0,136.33,280.81Z" fill="#263238" />
        </svg>
      </div>
    </Section>
  );
};

export default Landing;