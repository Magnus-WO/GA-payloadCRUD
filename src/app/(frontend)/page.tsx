import {
  createJulegave,
  deleteJulegave,
  getJulegaver,
  updateJulegave,
} from "./actions";

export default async function HomePage() {
  const thisYear = new Date().getFullYear();
  const julegaver = await getJulegaver();

  return (
    <main>
      <h1>JulegaveBonanza {thisYear}!</h1>
      <form className="giftForm" action={createJulegave}>
        <label>
          <span>Julegave</span>
          <input type="text" name="giftName" required />
        </label>
        <label>
          <span>Hvem skal få gaven?</span>
          <input type="text" name="reciever" required />
        </label>
        <label>
          <span>Pris</span>
          <input type="number" min={0} name="price" required />
        </label>
        <label>
          <span>Kjøpt:</span>
          <input type="checkbox" name="hasBeenBought" />
        </label>
        <button type="submit" className="giftFormBtn">
          Legg til julegave!
        </button>
      </form>
      <hr />
      <section className="julegaver">
        {julegaver.length === 0 ? (
          <p>Nissen har nok ikke vært her ennå</p>
        ) : (
          <section className="julegaveGrid">
            {julegaver.map((gave) => (
              <article className="julegave" key={gave.id}>
                <form
                  action={updateJulegave.bind(null, gave.id)}
                  className="updateGaveForm"
                >
                  <label>
                    <span>Til:</span>
                    <input
                      type="text"
                      name="reciever"
                      defaultValue={gave.reciever}
                    />
                  </label>
                  <label>
                    <span>Gave:</span>
                    <input
                      type="text"
                      defaultValue={gave.giftName}
                      name="giftName"
                    />
                  </label>
                  <label>
                    <span>Pris</span>
                    <input
                      type="number"
                      name="price"
                      defaultValue={`${gave.price}`}
                    />
                  </label>

                  <button className="updateGiftBtn" type="submit">
                    Endre gave
                  </button>
                </form>
                <form
                  action={deleteJulegave.bind(null, gave.id)}
                  className="deleteForm"
                >
                  <button type="submit" title="Slett julegave">
                    X
                  </button>
                </form>
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  );
}
