import React, {useEffect, useState} from "react";
import filter from "../../assets/filter.svg"
import { DELETE, DOWNLOAD} from "../../Constantes/Constantes";
import { QRCodeCanvas } from "qrcode.react";
import { ModelVcard } from "../../Interface.ts/Interface";
import { deleteVcardById, getVcardById } from "../../Helpers/Qrcode/QRCodeRequest";
import { getVcardFilterDate, getVcardFilterAlpha } from "../../Helpers/Qrcode/QRCodeFilterRequest";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ROOT_CREATE_QRCODE } from "../../Constantes/ConstantRoute";
import SearchBar from "../../ComposantsCommun/SearchBar";
import { DeleteMessage, DownloadMessage } from "../../ComposantsCommun/DisplayMessage";
import SortButtons from "../../ComposantsCommun/SortButtons";


const QrVcardAreaView = () => {
    const {user, isLoaded, isSignedIn} = useUser();
    const [vcard, setVcard] = useState<ModelVcard[]>([]);
    const {getToken} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState("");
    const [showSelect, setShowSelect] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [showDownloadMessage, setShowDownloadMessage] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        if (isLoaded) {
            getVcard();
        }
    }, [isLoaded]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

  const deleteVcard = async (qrcodeId?: string) => {
    try {
      const token = await getToken() ?? "";
      await deleteVcardById(user?.id, qrcodeId, token);
      setVcard((prevQrcodes) => prevQrcodes.filter((qrcode) => qrcode._id !== qrcodeId));
      setShowDownloadMessage(false);
      setShowDeleteMessage(true);
    } catch (error) {
      console.error(error);
    }}

    const downloadVcard = (id: string, name: string | undefined) => {
        const canvas = document.getElementById(id) as HTMLCanvasElement
        if (!canvas) throw new Error("<canvas> not found in the DOM")
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream")
        const downloadLink = document.createElement("a")
        downloadLink.href = pngUrl
        if (name === "") {
            downloadLink.download = "QRCoffee vcard.png"
        } else {
            downloadLink.download = name + ".png"
        }
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        setShowDownloadMessage(true);
    }

    const fetchVcardDate = async () => {
        try {
            const token = await getToken() ?? "";
            const vcardResult = await getVcardFilterDate(user?.id, token);
            setVcard(vcardResult);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const fetchVcardAlpha = async () => {
        try {
            const token = await getToken() ?? "";
            const vcardResult = await getVcardFilterAlpha(user?.id, token);
            setVcard(vcardResult);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const getVcard = async () => {
        try {
            const token = await getToken() ?? "";
            const vcardResult = await getVcardById(user?.id, token);
            setVcard(vcardResult);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const handleSelectChange = (event: any) => {
        const selectedOption = event.target.value;
        if (selectedOption === "option1") {
            fetchVcardDate();
            const selectedValue = event.target.value;
            setSelectedOption(selectedValue);
        }
        if (selectedOption === "option2") {
            const selectedValue = event.target.value;
            fetchVcardAlpha();
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
                    {showSelect && vcard.length > 0 && (
                        <SortButtons
                            selectedOption={selectedOption}
                            handleSelectChange={handleSelectChange}
                        />
                    )}
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
            {vcard.length === 0 ? (
                <div>
                    <p className="py-2">Vous n'avez pas encore créé de Vcard.</p>
                    <Link to={ROOT_CREATE_QRCODE.code} className="border border-secondary text-white text-sm rounded-lg block p-2.5 text-center bg-secondary">
                    Créer une Vcard
                    </Link>
                </div>
                ) : vcard.filter((vcardItem) => vcardItem.name?.toLocaleLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                <p>Aucune Vcard ne correspond à votre recherche.</p>
                ) : (
                vcard
                    .filter((vcardItem) => vcardItem.name?.toLocaleLowerCase().includes(searchTerm.toLowerCase()))
                    .map((vcardItem, number) => (
                    <div key={vcardItem._id} className="w-1/6 bg-white p-4 rounded-lg m-[10px]">
                        <div className="flex justify-center">
                        <QRCodeCanvas
                            id={"Vcard." + number.toString()}
                            value={vcardItem.value ?? ""}
                            size={200}
                            bgColor={vcardItem.backgroundColor}
                            fgColor={vcardItem.foregroundColor}
                            includeMargin={vcardItem.includeMargin}
                        />
                        </div>
                        <p className="text-center font-bold pt-1">
                        Créé le:{" "}
                        {vcardItem.dateCreation
                            ? `${new Date(vcardItem.dateCreation).toLocaleDateString("fr-FR")} ${new Date(vcardItem.dateCreation).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
                            : "Date de création: Date inconnue"}
                        </p>
                        <p className="text-center font-bold pt-1">
                        Nom: {vcardItem.name ? vcardItem.name : "Nom inconnu"}
                        </p>
                        <div className="flex justify-between">
                        <button onClick={() => deleteVcard(vcardItem._id)} className="border border-gray-300 bg-gray-100 text-sm rounded-lg block p-2.5 hover:bg-error hover:text-white">
                            {DELETE}
                        </button>
                        <button onClick={() => downloadVcard('Vcard.' + number.toString(), vcardItem.name)} className="border border-gray-300 bg-gray-100 text-sm rounded-lg block p-2.5 hover:bg-success hover:text-white">
                            {DOWNLOAD}
                        </button>
                        </div>
                    </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default QrVcardAreaView;