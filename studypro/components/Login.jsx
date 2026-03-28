export default function Login(props) {

  function handleSubmit(e) {
    e.preventDefault(); // prevent refresh

    const formData = new FormData(e.currentTarget); // the <form> element
    const name = formData.get("name") || "";
    const familyName = formData.get("familyName") || "";

    console.log("Data submitted");

    if (name && familyName) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ name /*: name*/, familyName /*: familyName*/ })
      );
      props.setUserInfo({ name, familyName });
    } else {
      alert("please sign in")
    }
  }

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="labels-container">
        <label htmlFor="name">Welcome to StudyPro</label>
        </div>
        <input
          className="info-input"
          id="name"
          name="name"
          type="text"
          placeholder="name"
        />
        <input
          className="info-input"
          id="familyName"
          name="familyName"
          type="text"
          placeholder="family name"
        />
        <div className="seperator"></div>
        <button className="done-button" type="submit">
          Done
        </button>
      </form>
    </section>
  )
}