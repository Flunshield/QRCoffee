import {QRCodeCanvas} from "qrcode.react";
import Button from "../../ComposantsCommun/Button";
import Card from "../../ComposantsCommun/Card";
import CardContent from "../../ComposantsCommun/CardContent";
import {DELETE, DOWNLOAD} from "../../Constantes/Constantes";
import {ModelQrcode} from "../../Interface.ts/Interface";
import React from "react";

interface QrcodeListProps {
    QrCode: ModelQrcode[];
    deleteQrCode: (id: string | undefined) => void;
    downloadQRCode: (id: string) => void;
    className?: string;
}

const QrcodeList: React.FC<QrcodeListProps> = ({QrCode, deleteQrCode, downloadQRCode, className,}) => {
    return (
        <Card className="flex flex-wrap justify-center mt-4">
            {QrCode.map((qrcode, number) => (
                <CardContent className="flex-col" key={number}>
                    <div>
                        <h2 className="text-lg font-semibold">Nom : {qrcode.name}</h2>
                        <h2 className="text-lg font-semibold"> {qrcode.dateCreation &&
                            <p>Créer le : {qrcode.dateCreation.toString()}</p>}</h2>

                    </div>
                    <div className="flex justify-center">
                        <QRCodeCanvas
                            id={'Qrcode.' + number.toString()}
                            value={qrcode.value ?? ''}
                            size={180}
                            bgColor={qrcode.backgroundColor}
                            fgColor={qrcode.foregroundColor}
                            level={qrcode.ErrorLevel}
                            includeMargin={qrcode.includeMargin}
                        />
                    </div>
                    <div className="flex justify-center mt-2">
                        <Button
                            id="Supprimer"
                            onClick={() => deleteQrCode(qrcode._id)}
                            type="button"
                            className="px-4 py-2 bg-red-500 text-white rounded mr-3"
                        >
                            <b>{DELETE}</b>
                        </Button>
                        <Button
                            id="Télécharger"
                            type="button"
                            onClick={() => downloadQRCode('Qrcode.' + number.toString())}
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

export default QrcodeList;