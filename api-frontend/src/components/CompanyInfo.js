import "./CompanyInfo.css";

export const CompanyInfo = () => {
  return (
    <>
      <section className="project-info">
        <article>
          <h1>Project Info</h1>
          <p>
            This is a RESTful project its purpose is to be presented as a final
            project of the React course in SoftUni.
          </p>
        </article>

        <article>
          <h1>Overview</h1>
          <p>
            In order to use this application you must be logged in. Django
            handles authentication and all errors are handled by the server.
            There is NO client side input validation.
          </p>
          <p>
            All state management is handled with Zustand. Only local form inputs
            are handled within the component.
          </p>
          <p>
            There is no routing. All components live simultaneously and fill
            with data when the component changes its state.
          </p>
          <p>
            Initially all components are hidden and do not render until one of
            them is called.
          </p>
        </article>

        <article>
          <h4>Let's proceed</h4>
        </article>
      </section>
    </>
  );
};
