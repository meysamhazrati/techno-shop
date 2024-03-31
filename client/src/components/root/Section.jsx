const Section = ({ className, children }) => {
  return <section className={`mt-12 first:mt-0 ${className || ""}`}>{children}</section>;
};

export default Section;