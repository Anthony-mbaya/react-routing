import { Form, useLoaderData } from "react-router-dom";

import { getContact } from "../contacts";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export const Contact = () => {
    const { contact } = useLoaderData();
    /*const contact = {
        first: 'fname',
        last: 'lname',
        avatar: 'https://robohash.org/you.png?size=200x200',
        twitter: 'hanle',
        notes: 'some notes',
        favourite: 'true',
    }*/
    return (
        <div id="contact">
            <div>
                <img src={
                    contact.avatar ||
                    `https://robohash.org/${contact.id}.png?size=200x200`}
                    key={contact.avatar} />
            </div>
            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <>
                            <p>No contact selected</p>
                        </>
                    )}
                    <Favorite contact={contact} />
                </h1>
                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit" >
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action='destroy'
                        onSubmit={(e) => {
                            if (!confirm(
                                `Are you sure you want to delete ${contact.first} ${contact.last}?`
                            )) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>

            </div>
        </div>
    )
}
function Favorite({ contact }) {
    const favorite = contact.favorite;
    return (
      <Form method="post">
        <button
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {favorite ? "★" : "☆"}
        </button>
      </Form>
    );
  }