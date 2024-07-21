const Hero = ({ isHome = false }) => {
  return (
    <>
      <section className="text-center border-b-2 p-5 md:p-10">
        {isHome ? (
          <>
            <h1 className="text-4xl mb-2 sm:mb-5 sm:text-6xl">Simply Blog</h1>
            <p className="text-lg sm:text-2xl">No Frills, Just Write</p>
          </>
        ) : (
          <>
            <h1 className="text-4xl mb-2 sm:text-6xl">Archives</h1>
          </>
        )}
      </section>
    </>
  );
};
export default Hero;
