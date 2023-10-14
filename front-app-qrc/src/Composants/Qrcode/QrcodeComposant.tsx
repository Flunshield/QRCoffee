import {ErrorMessage, Field, Form, Formik} from "formik";
import {QRCodeSVG} from "qrcode.react";
import React, {useRef, useState} from "react";
import Button from "../../ComposantsCommun/Button";
import Card from "../../ComposantsCommun/Card";
import CardContent from "../../ComposantsCommun/CardContent";
import Label from "../../ComposantsCommun/Label";
import {
    ADD_BORDURE,
    DELETE_BORDURE,
    DOWNLOAD,
    ERROR_LEVEL,
    GENERATE,
    NAME_QRCODE,
    OPTION_ERRORS,
    QRCODE_BACKGROUND,
    QRCODE_COLOR,
    QRCODE_PREVERSUALISATION,
    SAVE,
    SIZE
} from "../../Constantes/Constantes";
import {ModelQrcode} from "../../Interface.ts/Interface";
import {onSVGButtonClick} from "../../Helpers/Qrcode/QRCodeHelper";
import {PushQrcode} from "../../Helpers/Qrcode/QRCodeRequest";
import {useAuth, useUser} from "@clerk/clerk-react";

export default function QrcodeComposant() {
    const {user, isSignedIn} = useUser();

    const initialValues: ModelQrcode = {
        name: "",
        size: 256,
        foregroundColor: "#000000",
        backgroundColor: "#DEEEEB",
        ErrorLevel: "",
        value: ""
    }

    const [valueBackgroundColor, setValueBackgroundColor] = useState<string | undefined>("")
    const [valueForegroundColor, setValueForegroundColor] = useState<string | undefined>("")
    const [valueErrorsLevel, setValueErrorsLevel] = useState<string | undefined>(undefined)
    const [valueQrCode, setValueQrCode] = useState<string | undefined>(initialValues.value)
    const [sizeQrCode, setSizeQrCode] = useState<number>(256)
    const [isMargin, setIsMargin] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [maj, setMaj] = useState(false)
    const {getToken} = useAuth()

    const onSubmit = (values: ModelQrcode) => {
        setValueQrCode(values.value)
        values.size && setSizeQrCode(values.size)
        setValueBackgroundColor(values.backgroundColor)
        setValueForegroundColor(values.foregroundColor)
        setName(values.name ?? "")
        setMaj(true)
    }

    function handleChange() {
        PushQrcode(
            getToken,
            user?.id,
            valueQrCode,
            valueBackgroundColor,
            valueForegroundColor,
            valueErrorsLevel,
            sizeQrCode,
            isMargin,
            name
        )
        setMaj(false)
    }

    const handleChangeErrors = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValueErrorsLevel(event.target.value)
    }
    const validate = (values: ModelQrcode) => {
        const errors: Partial<ModelQrcode> = {}
        if (values.ErrorLevel && !OPTION_ERRORS.includes(values.ErrorLevel)) {
            errors.ErrorLevel = "Merci de renseigner une des valeurs suivante : L M Q H"
        }
        return errors
    }

    let svgRef: React.MutableRefObject<null> = useRef(null)

    return (
        <Card className="card">
            <CardContent className="title flex justify-center items-center">
                <div className="flex flex-col items-center mt-5">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values: ModelQrcode) => {
                            Promise.resolve(onSubmit(values));
                        }}
                        validate={validate}
                    >
                        <Form className="max-w-xl">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label id="nameQRCode">{NAME_QRCODE} du Qr-Code</Label>
                                    <Field
                                        id="name"
                                        label="Name"
                                        variant="filled"
                                        type="text"
                                        name="name"
                                        className="w-full border border-black p-2 rounded"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500"/>
                                </div>
                                <div>
                                    <Label id="add-text">URL</Label>
                                    <Field
                                        id="value"
                                        label="Value"
                                        variant="filled"
                                        type="text"
                                        name="value"
                                        className="w-full border border-black p-2 rounded"
                                    />
                                    <ErrorMessage name="value" component="div" className="text-red-500"/>
                                </div>
                            </div>
                            <div>
                                <Label id="size">{SIZE}</Label>
                                <Field
                                    id="size"
                                    label="Size"
                                    variant="filled"
                                    type="number"
                                    name="size"
                                    className="w-full border border-black p-2 rounded"
                                />
                                <ErrorMessage name="size" component="div" className="text-red-500"/>
                            </div>
                            <div className="grid grid-cols-2 gap-3 w-full max-w-xl">
                                <div>
                                    <Label id="background">{QRCODE_BACKGROUND}</Label>
                                    <Field id="backgroundColor" label="Background color" variant="filled" type="color"
                                           name="backgroundColor" className="w-full border border-black"/>
                                    <ErrorMessage name="backgroundColor" component="div"/>
                                </div>
                                <div>
                                    <Label id="color">{QRCODE_COLOR}</Label>
                                    <Field id="foregroundColor" label="Foreground color" variant="filled" type="color"
                                           name="foregroundColor" className="w-full border border-black"/>
                                    <ErrorMessage name="foregroundColor" component="div"/>
                                </div>
                            </div>
                            <div>
                                <Label id="errorsLvl">{ERROR_LEVEL}</Label>
                                <select
                                    id="errorsLvl"
                                    onChange={handleChangeErrors}
                                    className="w-full border border-black p-2 rounded"
                                >
                                    <option value="L">L</option>
                                    <option value="M">M</option>
                                    <option value="H">H</option>
                                    <option value="Q">Q</option>
                                </select>
                                <ErrorMessage name="ErrorLevel" component="div" className="text-red-500"/>
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
                {maj && (
                    <div className=" ml-5">
                        <h1 className="my-2">{QRCODE_PREVERSUALISATION}</h1>
                        <div ref={svgRef} className="flex justify-center">
                            <QRCodeSVG
                                value={valueQrCode ?? ""}
                                size={sizeQrCode}
                                bgColor={valueBackgroundColor}
                                fgColor={valueForegroundColor}
                                level={valueErrorsLevel}
                                includeMargin={isMargin}
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
                                id={"Télécharger"}
                                type="submit"
                                className="mt-2 ml-2 px-4 py-2 rounded bg-blue-500 text-white"
                                onClick={() => onSVGButtonClick(svgRef)}
                            >
                                {DOWNLOAD}
                            </Button>
                        </div>
                    </div>)}
            </CardContent>
        </Card>
    )
}