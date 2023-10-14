import {QRCodeCanvas} from "qrcode.react";
import Button from "../../ComposantsCommun/Button";
import Card from "../../ComposantsCommun/Card";
import CardContent from "../../ComposantsCommun/CardContent";
import {DELETE, DOWNLOAD} from "../../Constantes/Constantes";
import {ModelVcard} from "../../Interface.ts/Interface";

interface VcardQRCodeListProps {
    vCard: ModelVcard[];
    deleteVcard: (id: string | undefined) => void;
    downloadQRCode: (id: string) => void;
}

const VcardQRCodeList: React.FC<VcardQRCodeListProps> = ({vCard, deleteVcard, downloadQRCode}) => {
    return (
        <Card className="flex flex-wrap justify-center mt-4">

            {vCard.map((vCard: ModelVcard, number: number) => (
                <CardContent className="flex-col m-4" key={number}>
                    <div>
                        <h2 className="text-lg font-semibold"> {vCard.dateCreation &&
                            <p>Créer le : {vCard.dateCreation.toString()}</p>}</h2>
                    </div>
                    <div className="flex justify-center">
                        <QRCodeCanvas
                            id={'Vcard.' + number.toString()}
                            value={vCard.value ?? ''}
                            size={200}
                            bgColor={vCard.backgroundColor}
                            fgColor={vCard.foregroundColor}
                            includeMargin={vCard.includeMargin}
                        />
                    </div>
                    <div className="flex justify-center mt-2">
                        <Button
                            id="Supprimer"
                            onClick={() => deleteVcard(vCard._id)}
                            type="button"
                            className="px-4 py-2 bg-red-500 text-white rounded mr-3"
                        >
                            <b>{DELETE}</b>
                        </Button>
                        <Button
                            id="Télécharger"
                            type="button"
                            onClick={() => downloadQRCode('Vcard.' + number.toString())}
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

export default VcardQRCodeList;