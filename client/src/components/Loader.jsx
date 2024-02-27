const Loader = ({ width, height, color }) => {
  return (
    <div
      className="animate-loader !bg-no-repeat"
      style={{
        width,
        height,
        background: `radial-gradient(circle closest-side, ${color} 90%, transparent) 0% 50%, radial-gradient(circle closest-side, ${color} 90%, transparent) 50% 50%, radial-gradient(circle closest-side, ${color} 90%, transparent) 100% 50%`,
        backgroundSize: "calc(100% / 3) 100%",
      }}
    ></div>
  );
};

export default Loader;