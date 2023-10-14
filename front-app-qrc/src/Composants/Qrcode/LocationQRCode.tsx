import {useState} from 'react';
import QRCode from 'qrcode.react';
import Card from '../../ComposantsCommun/Card';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import CardContent from '../../ComposantsCommun/CardContent';
import Label from '../../ComposantsCommun/Label';
import {ModelLocation} from '../../Interface.ts/Interface';
import {PushLocation} from '../../Helpers/Qrcode/QRCodeRequest';
import Button from '../../ComposantsCommun/Button';
import {GENERATE, NAME_QRCODE, QRCODE_BACKGROUND, QRCODE_COLOR, SAVE} from '../../Constantes/Constantes';
import {useAuth, useUser} from '@clerk/clerk-react';

const LocationQRCode = () => {
    const [locationUrl, setLocationUrl] = useState<string>("")
    const [sizeQrCode, setSizeQrCode] = useState<number>(256)
    const [maj, setMaj] = useState(false)
    const [name, setName] = useState<string>("")
    const [valueBackgroundColor, setValueBackgroundColor] = useState<string>("")
    const [valueForegroundColor, setValueForegroundColor] = useState<string>("")
    const {user, isSignedIn} = useUser();
    const {getToken} = useAuth()
    const initialValues: ModelLocation = {
        name: "",
        latitude: "",
        longitude: "",
        size: 256,
        foregroundColor: "#000000",
        backgroundColor: "#DEEEEB",
    };

    const validateDecimal = (value: string) => {
        const regex = /^\d+(\.\d+)?$/;
        return regex.test(value) ? undefined : "Veuillez saisir une valeur décimale";
    };

    const onSubmit = (values: ModelLocation) => {
        const {latitude, longitude} = values;
        setSizeQrCode(values.size ?? 256);
        setLocationUrl(`geo:${latitude},${longitude}`);
        setName(values.name ?? "")
        setValueBackgroundColor(values.backgroundColor ?? "")
        setValueForegroundColor(values.foregroundColor ?? "")
        setMaj(true)
    };

    function handleChange() {
        PushLocation(
            getToken,
            user?.id,
            locationUrl,
            sizeQrCode,
            name,
            valueBackgroundColor,
            valueForegroundColor
        )
        setMaj(false)
    }

    return (
        <Card className="card">
            <CardContent className="title flex justify-center items-center">
                <div className="flex flex-col items-center mt-5 mr-10">
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form>
                            <div>
                                <Label id="nameQRCode">{NAME_QRCODE} du Qr-Code</Label>
                                <Field
                                    id="nameLocation"
                                    label="Name"
                                    variant="filled"
                                    type="text"
                                    name="name"
                                    className="w-full border border-black p-2 rounded"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500"/>
                            </div>
                            <div>
                                <Label htmlFor="latitude" id="latitude">
                                    Latitude
                                </Label>
                                <Field
                                    id="latitudeLocation"
                                    name="latitude"
                                    type="text"
                                    className="w-full border border-black p-2 rounded"
                                    validate={validateDecimal}
                                />
                                <ErrorMessage name="latitude" component="div" className="text-red-500"/>
                            </div>
                            <div>
                                <Label htmlFor="longitude" id="longitude">
                                    Longitude
                                </Label>
                                <Field
                                    id="longitudeLocation"
                                    name="longitude"
                                    type="text"
                                    className="w-full border border-black p-2 rounded"
                                    validate={validateDecimal}
                                />
                                <ErrorMessage name="longitude" component="div" className="text-red-500"/>
                            </div>
                            <div>
                                <Label htmlFor="size" id="size">
                                    Taille
                                </Label>
                                <Field
                                    id="sizeLocation"
                                    name="size"
                                    type="text"
                                    className="w-full border border-black p-2 rounded"
                                    validate={validateDecimal}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3 w-full max-w-xl">
                                <div>
                                    <Label htmlFor="background"
                                           id="background">
                                        {QRCODE_BACKGROUND}
                                    </Label>
                                    <Field
                                        id="backgroundColorLocation"
                                        label="Background color"
                                        variant="filled"
                                        type="color"
                                        name="backgroundColor"
                                        className="w-full border border-black"
                                    />
                                </div>
                                <div>
                                    <Label id="color"
                                           htmlFor="foregroundColor">
                                        {QRCODE_COLOR}
                                    </Label>
                                    <Field
                                        id="foregroundColorLocation"
                                        label="Foreground color"
                                        variant="filled"
                                        type="color"
                                        name="foregroundColor"
                                        className="w-full border border-black"
                                    />
                                </div>
                            </div>
                            <Button id="Générer-le-QRCODE" type="submit" className="mt-1 px-4 py-2 rounded bg-blue-500 text-white">
                                <b>{GENERATE}</b>
                            </Button>
                        </Form>
                    </Formik>
                </div>
                {locationUrl &&
                    < div>
                        <QRCode
                            value={locationUrl}
                            size={sizeQrCode}
                            bgColor={valueBackgroundColor}
                            fgColor={valueForegroundColor}
                        />
                    </div>
                }
                {maj && isSignedIn ? (
                    <Button id="Sauvegarder" type="submit" className="mt-1 ml-2 px-4 py-2 rounded bg-blue-500 text-white"
                            onClick={handleChange}>
                        <b>{SAVE}</b>
                    </Button>
                ) : (<p></p>)}
            </CardContent>
        </Card>
    );
};

export default LocationQRCode;