import {Field, Form, Formik} from "formik";
import {QRCodeCanvas} from "qrcode.react";
import {useRef, useState} from "react";
import Button from "../../ComposantsCommun/Button";
import {downloadQRCode} from "../../Helpers/Qrcode/QRCodeHelper";
import {
    ADD_BORDURE,
    DELETE_BORDURE,
    DOWNLOAD,
    GENERATE,
    QRCODE_BACKGROUND,
    QRCODE_COLOR,
    SAVE,
    SIZE
} from "../../Constantes/Constantes";
import CardContent from "../../ComposantsCommun/CardContent";
import Card from "../../ComposantsCommun/Card";
import {ModelVcard} from "../../Interface.ts/Interface";
import Label from "../../ComposantsCommun/Label";
import {PushVcard} from "../../Helpers/Qrcode/QRCodeRequest";
import {useAuth, useUser} from "@clerk/clerk-react";

export default function QrcodeComposant() {
    const initialValues: ModelVcard = {
        name: "",
        firstName: "",
        lastName: "",
        job: "",
        email: "",
        telephone: "",
        adresse: "",
        size: 256,
        foregroundColor: "#000000",
        backgroundColor: "#DEEEEB",
    };

    const [vCard, setVCard] = useState<string>("")
    const [sizeQrCode, setSizeQrCode] = useState<number>(256)
    const [valueBackgroundColor, setValueBackgroundColor] = useState<string>("")
    const [valueForegroundColor, setValueForegroundColor] = useState<string>("")
    const [isMargin, setIsMargin] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [maj, setMaj] = useState(false)
    const {user, isSignedIn} = useUser()
    const {getToken} = useAuth()
    const onSubmit = (values: ModelVcard) => {
        const vCardData = `BEGIN:VCARD
VERSION:2.1
N:${values.lastName};${values.firstName};;;
FN:${values.firstName} ${values.lastName}
ORG:Company Name
TITLE:${values.job}
EMAIL;TYPE=INTERNET:${values.email}
TEL;TYPE=CELL:${values.telephone}
ADR;TYPE=WORK:${values.adresse}
END:VCARD`;
        setVCard(vCardData);
        setValueBackgroundColor(values.backgroundColor ?? "")
        setValueForegroundColor(values.foregroundColor ?? "")
        setSizeQrCode(values.size ?? 256)
        setName(values.name ?? "")
        setMaj(true)
    };

    function handleChange() {
        PushVcard(
            getToken,
            user?.id,
            vCard,
            valueBackgroundColor,
            valueForegroundColor,
            sizeQrCode,
            isMargin,
            name
        )
        setMaj(false)
    }

    const svgRef = useRef(null);

    return (
        <Card className="card">
            <CardContent className="title flex justify-center items-center">
                <div className="flex flex-col items-center mt-5 mr-10">
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form>
                            <div>
                                <Label
                                    htmlFor="nameVcard"
                                    id={"name"}>
                                    Nom Vcard
                                </Label>
                                <Field
                                    id="nameVcard"
                                    name="name"
                                    type="text"
                                    className="w-full border border-black p-2 rounded"
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="firstName"
                                    id={"firstName"}>
                                    Prénom
                                </Label>
                                <Field
                                    id="firstNameVcard"
                                    name="firstName"
                                    type="text"
                                    className="w-full border border-black p-2 rounded"
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName" id={"lastName"}>Nom</Label>
                                <Field
                                    id="lastNameVcard"
                                    name="lastName"
                                    type="text"
                                    className="w-full border border-black p-2 rounded"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3 w-full max-w-xl">
                                <div>
                                    <Label htmlFor="background"
                                           id="background">
                                        {QRCODE_BACKGROUND}
                                    </Label>
                                    <Field
                                        id="backgroundColorVcard"
                                        label="Background color"
                                        variant="filled"
                                        type="color"
                                        name="background"
                                        className="w-full border border-black"
                                    />
                                </div>
                                <div>
                                    <Label id="color"
                                           htmlFor="foregroundColor">
                                        {QRCODE_COLOR}
                                    </Label>
                                    <Field
                                        id="foregroundColorVcard"
                                        label="Foreground color"
                                        variant="filled"
                                        type="color"
                                        name="foregroundColor"
                                        className="w-full border border-black"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label id="size">{SIZE}</Label>
                                <Field
                                    id="sizeVcard"
                                    label="Size"
                                    variant="filled"
                                    type="number"
                                    name="size"
                                    className="w-full border border-black p-2 rounded"
                                />
                            </div>
                            <div>
                                <Label htmlFor="job"
                                       id={"job"}>
                                    Travail
                                </Label>
                                <Field
                                    id="jobVcard"
                                    name="job"
                                    type="text"
                                    className="w-full border border-black p-2 rounded"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="email"
                                    id={"email"}>
                                    Email
                                </Label>
                                <Field
                                    id="emailVcard"
                                    name="email"
                                    type="email"
                                    className="w-full border border-black p-2 rounded"
                                />
                            </div>
                            <div>

                                <Label
                                    htmlFor="telephone"
                                    id={"telephone"}>
                                    Téléphone
                                </Label>
                                <Field
                                    id="telephoneVcard"
                                    name="telephone"
                                    type="text"
                                    className="w-full border border-black p-2 rounded"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="adresse"
                                    id={"adresse"}>
                                    Adresse
                                </Label>
                                <Field
                                    id="adresseVcard"
                                    name="adresse"
                                    type="text"
                                    className="w-full border border-black p-2 rounded"
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button id="Générer-le-QRCODE" type="submit" className="mt-1 px-4 py-2 rounded bg-blue-500 text-white">
                                    <b>{GENERATE}</b>
                                </Button>
                                {maj && isSignedIn ? (
                                    <Button id="Sauvegarder" type="submit" className="mt-1 ml-2 px-4 py-2 rounded bg-blue-500 text-white"
                                            onClick={handleChange}>
                                        <b>{SAVE}</b>
                                    </Button>
                                ) : (<p></p>)}
                            </div>
                        </Form>
                    </Formik>
                </div>

                {vCard &&
                    <div>
                        <div ref={svgRef} className="flex justify-center">
                            <QRCodeCanvas
                                id={"Qrcode"}
                                value={vCard}
                                size={sizeQrCode}
                                includeMargin={isMargin}
                                bgColor={valueBackgroundColor}
                                fgColor={valueForegroundColor}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button
                                id="bordure"
                                type="button"
                                className="mt-2 mr-2 px-4 py-2 rounded bg-blue-500 text-white"
                                onClick={() => setIsMargin(!isMargin)}
                            >
                                {isMargin ? DELETE_BORDURE : ADD_BORDURE}
                            </Button>
                            <Button
                                id="Télécharger"
                                type="submit"
                                className="mt-2 ml-2 px-4 py-2 rounded bg-blue-500 text-white"
                                onClick={() => downloadQRCode("Qrcode")}
                            >
                                {DOWNLOAD}
                            </Button>
                        </div>
                    </div>}
            </CardContent>
        </Card>
    );
}
