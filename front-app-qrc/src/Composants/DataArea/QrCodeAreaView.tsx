import "../../StyleCss/Home.css";
import filter from "../../assets/filter.svg"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { DELETE, DOWNLOAD} from "../../Constantes/Constantes";
import { getQrcodeFilterDate, getQrcodeFilterAlpha } from "../../Helpers/Qrcode/QRCodeFilterRequest";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { ModelQrcode } from "../../Interface.ts/Interface";
import { deleteQrcodeById, getQrcodeById } from "../../Helpers/Qrcode/QRCodeRequest";
import { ROOT_CREATE_QRCODE } from "../../Constantes/ConstantRoute";
import SearchBar from "../../ComposantsCommun/SearchBar";
import { DeleteMessage, DownloadMessage } from "../../ComposantsCommun/DisplayMessage";
import SortButtons from "../../ComposantsCommun/SortButtons";

const QrCodeAreaView = () => {
    const {user, isLoaded} = useUser();
    const [qrcode, setQrcode] = useState<ModelQrcode[]>([]);
    const {getToken} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState("");
    const [showSelect, setShowSelect] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [showDownloadMessage, setShowDownloadMessage] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    

    useEffect(() => {
        if (isLoaded) {
            getQrCode();
        }
    }, [isLoaded]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const deleteQrcode = async (qrcodeId?: string) => {
        try {
          const token = await getToken() ?? "";
          await deleteQrcodeById(user?.id, qrcodeId, token);
          setQrcode((prevQrcodes) => prevQrcodes.filter((qrcode) => qrcode._id !== qrcodeId));
          setShowDownloadMessage(false);
          setShowDeleteMessage(true);
        } catch (error) {
            console.error(error);
        }
    }

    const downloadQRCode = (id: string, name: string | undefined) => {
        const canvas = document.getElementById(id) as HTMLCanvasElement
        if (!canvas) throw new Error("<canvas> not found in the DOM")
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream")
        const downloadLink = document.createElement("a")
        downloadLink.href = pngUrl
        if (name === "") {
            downloadLink.download = "QRCoffee qrcode.png"
        } else {
            downloadLink.download = name + ".png"
        }
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        setShowDeleteMessage(false);
        setShowDownloadMessage(true);
    }

    const fetchQrcodeDate = async () => {
        try {
            const token = await getToken() ?? "";
            const qrcodeResult = await getQrcodeFilterDate(user?.id, token);
            setQrcode(qrcodeResult);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const fetchQrcodeAlpha = async () => {
        try {
            const token = await getToken() ?? "";
            const qrcodeResult = await getQrcodeFilterAlpha(user?.id, token);
            setQrcode(qrcodeResult);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const getQrCode = async () => {
        try {
            const token = await getToken() ?? "";
            const qrcodeResult = await getQrcodeById(user?.id, token);
            setQrcode(qrcodeResult);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const handleSelectChange = (event: any) => {
        const selectedOption = event.target.value;
        if (selectedOption === "option1") {
            fetchQrcodeDate();
            const selectedValue = event.target.value;
            setSelectedOption(selectedValue);
        }
        if (selectedOption === "option2") {
            fetchQrcodeAlpha();
            const selectedValue = event.target.value;
            setSelectedOption(selectedValue);
        } else {
        }
    };

    const handleFilterClick = () => {
        setShowSelect(!showSelect);
    };

    return (
        <div className="rounded-lg shadow-md overflow-hidden border border-black card">
            <div className="flex justify-between items-center">
                <div className="flex justify-between">
                    <a className="flex items-center p-2.5" onClick={handleFilterClick}>
                        <img className="w-6" src={filter} alt=""/>
                    </a>
                    <div className="">
                        {showSelect && qrcode.length > 0 && (
                            <SortButtons
                                selectedOption={selectedOption}
                                handleSelectChange={handleSelectChange}
                            />
                        )}
                    </div>
                </div>
                <SearchBar searchTerm={searchTerm} onSearch={handleSearch}/>
            </div>
            <div className="pt-2">
                {showDeleteMessage && (
                    <DeleteMessage/>
                )}
                {showDownloadMessage && (
                    <DownloadMessage/>
                )}
            </div>
            <div className="flex flex-wrap justify-center">
            {qrcode.length === 0 ? (
                <div>
                    <p className="py-2">Vous n'avez pas encore créé de QR code.</p>
                    <Link to={ROOT_CREATE_QRCODE.code} className="border border-secondary text-white text-sm rounded-lg block p-2.5 text-center bg-secondary">
                    Créer un Qrcode
                    </Link>
                </div>
                ) : qrcode.filter((qrcodeItem) => qrcodeItem.name?.toLocaleLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                <div className="py-20 font-bold text-xl text-center">
                    <p>Désolé, nous n'avons trouvé aucun résultat correspondant à votre recherche</p>
                </div>
                
                ) : (
                qrcode
                    .filter((qrcodeItem) => qrcodeItem.name?.toLocaleLowerCase().includes(searchTerm.toLowerCase()))
                    .map((qrcodeItem, number) => (
                    <div key={qrcodeItem._id} className="w-1/6 bg-white p-4 rounded-lg m-[10px]">
                        <div className="flex justify-center">
                        <QRCodeCanvas
                            id={"Qrcode." + number.toString()}
                            value={qrcodeItem.value ?? ""}
                            size={200}
                            bgColor={qrcodeItem.backgroundColor}
                            fgColor={qrcodeItem.foregroundColor}
                            includeMargin={qrcodeItem.includeMargin}
                        />
                        </div>
                        <p className="text-center font-bold pt-1">
                        Créer le:{" "}
                        {qrcodeItem.dateCreation
                            ? `${new Date(qrcodeItem.dateCreation).toLocaleDateString("fr-FR")} ${new Date(qrcodeItem.dateCreation).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
                            : "Date de création: Date inconnue"}
                        </p>
                        <p className="text-center font-bold py-1">
                        Name: {qrcodeItem.name ? qrcodeItem.name : "Name inconnue"}
                        </p>
                        <div className="flex justify-between">
                        <button onClick={() => deleteQrcode(qrcodeItem._id)} className="border border-gray-300 text-sm rounded-lg block p-2.5 hover:bg-error bg-gray-100 hover:text-white">
                            {DELETE}
                        </button>
                        <button onClick={() => downloadQRCode('Qrcode.' + number.toString(), qrcodeItem.name)} className="border border-gray-300 text-sm rounded-lg block p-2.5 hover:bg-success bg-gray-100 hover:text-white">
                            {DOWNLOAD}
                        </button>
                        </div>
                    </div>
                    ))
                )}
            </div>
        </div>
    )}
export default QrCodeAreaView