import "../StyleCss/Home.css";

import {Field, Form, Formik} from "formik";
import Button from "../ComposantsCommun/Button";
import {Contact} from "../Interface.ts/Interface";
import {sendContact} from "../Helpers/User/UserHelper";

const ContactDisplay = () => {

    const initialValues: Contact = {
        username: "",
        email: "",
        message: "",
    };

    const onSubmit = async (values: Contact) => {
        try {
            const result = await sendContact(values);
            if (result.success) {
                window.alert("Le mail a bien été envoyé")
                window.location.reload()
            } else {
                window.alert("Le mail n'a pas été envoyé, un problème est survenu")
            }
        } catch (error: any) {
            console.error('Erreur inattendue :', error.message);
        }
    };

    return (
        <div className="card">
            <div className="title">
                <h2 className="section-title">Nous contacter</h2>
                <p className="section-description">
                    Si vous avez des questions ou des commentaires, n'hésitez pas à nous contacter.
                </p>
                <div className="flex flex-col items-center mt-5 mr-10">
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form className="w-full">
                            <div className="flex flex-wrap mx-2">
                                <div className="w-1/2 px-2 mb-4">
                                    <label htmlFor="job" className="block text-gray-700 text-sm font-bold mb-2">
                                        Nom d'utilisateur:
                                    </label>
                                    <Field
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="w-full border border-black p-2 rounded"
                                    />
                                </div>
                                <div className="w-1/2 px-2 mb-4">
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                        Email:
                                    </label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="w-full border border-black p-2 rounded"
                                    />
                                </div>
                                <div className="w-full px-2 mb-6">
                                    <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                                        Message:
                                    </label>
                                    <Field
                                        as="textarea"
                                        id="message"
                                        name="message"
                                        rows="4"
                                        placeholder="Entrez votre message"
                                        className="w-full border border-black p-2 rounded"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    id="Envoyer"
                                    type="submit"
                                    className="mt-1 px-4 py-2 rounded bg-blue-500 text-white"
                                >
                                    Envoyer
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}
export default ContactDisplay