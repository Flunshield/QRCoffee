import {QRCodeCanvas} from "qrcode.react";
import Card from "../../ComposantsCommun/Card";
import CardContent from "../../ComposantsCommun/CardContent";
import {ModelLocation} from "../../Interface.ts/Interface";
import Button from "../../ComposantsCommun/Button";
import {DELETE, DOWNLOAD} from "../../Constantes/Constantes";
import React from "react";

interface LocationQRCodeListProps {
    location: ModelLocation[];
    deleteLocation: (id: string | undefined) => void;
    downloadQRCode: (id: string) => void;
}

const LocationQRCodeList: React.FC<LocationQRCodeListProps> = ({
                                                                   location,
                                                                   deleteLocation,
                                                                   downloadQRCode,
                                                               }) => {
    return (
        <Card className="flex flex-wrap justify-center mt-4">

            {location.map((location: ModelLocation, number: number) => (
                <CardContent
                    className="flex-col m-4"
                    key={number}
                >
                    <div>
                        {location.dateCreation && (
                            <p>Créer le : {location.dateCreation.toString()}</p>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <QRCodeCanvas
                            id={"location." + number.toString()}
                            value={location.value ?? ""}
                            bgColor={location.backgroundColor}
                            fgColor={location.foregroundColor}
                            size={200}
                        />
                    </div>
                    <div className="flex justify-center mt-2">
                        <Button
                            id="Supprimer"
                            onClick={() => deleteLocation(location._id)}
                            type="button"
                            className="px-4 py-2 bg-red-500 text-white rounded mr-3"
                        >
                            <b>{DELETE}</b>
                        </Button>
                        <Button
                            id="Télécharger"
                            type="button"
                            onClick={() => downloadQRCode("location." + number.toString())}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            {DOWNLOAD}
                        </Button>
                    </div>
                </CardContent>
            ))}
        </Card>
    );
};

export default LocationQRCodeList;