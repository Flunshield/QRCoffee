import "../../StyleCss/Home.css";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import filter from "../../assets/filter.svg"
import { QRCodeCanvas } from "qrcode.react";
import { getLocationFilterDate, getLocationFilterAlpha } from "../../Helpers/Qrcode/QRCodeFilterRequest";
import { useAuth, useUser } from "@clerk/clerk-react";
import { ModelLocation } from "../../Interface.ts/Interface";
import { deleteLocationById, getLocationById } from "../../Helpers/Qrcode/QRCodeRequest";
import { ROOT_CREATE_QRCODE } from "../../Constantes/ConstantRoute";
import { DELETE, DOWNLOAD } from "../../Constantes/Constantes";
import SearchBar from "../../ComposantsCommun/SearchBar";
import { DeleteMessage, DownloadMessage } from "../../ComposantsCommun/DisplayMessage";
import SortButtons from "../../ComposantsCommun/SortButtons";



const QrLocationView = () => {
    const { user, isLoaded } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState<ModelLocation[]>([]);
    const [showSelect, setShowSelect] = useState(false);
    const { getToken } = useAuth();
    const [selectedOption, setSelectedOption] = useState("");
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [showDownloadMessage, setShowDownloadMessage] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (isLoaded) {
            getLocation();
        }
    }, [isLoaded]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const deleteLocation = async (locationId?: string) => {
        try {
          const token = await getToken() ?? "";
          await deleteLocationById(user?.id, locationId, token);
          setLocation((prevLocation) => prevLocation.filter((location) => location._id !== locationId));
          setShowDownloadMessage(false);
          setShowDeleteMessage(true);
        } catch (error) {
          console.error(error);
        }
    }

    const downloadLocation = (id: string, name: string | undefined) => {
        const canvas = document.getElementById(id) as HTMLCanvasElement
        if (!canvas) throw new Error("<canvas> not found in the DOM")
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream")
        const downloadLink = document.createElement("a")
        downloadLink.href = pngUrl
        if (name === ""){
            downloadLink.download = "QRCoffee localisation.png"
        } else {
            downloadLink.download = name+".png"
        }
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        setShowDeleteMessage(false);
        setShowDownloadMessage(true);
    }

    const fetchLocationDate = async () => {
        try {
          const token = await getToken() ?? "";
          const qrcodeResult = await getLocationFilterDate(user?.id, token);
          setLocation(qrcodeResult);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
    };

    const fetchLocationAlpha = async () => {
        try {
          const token = await getToken() ?? "";
          const qrcodeResult = await getLocationFilterAlpha(user?.id, token);
          setLocation(qrcodeResult);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
    };

    const getLocation = async () => {
        try {
          const token = await getToken() ?? "";
          const qrcodeResult = await getLocationById(user?.id, token);
          setLocation(qrcodeResult);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
    };
    
    const handleSelectChange = (event: any) => {
        const selectedOption = event.target.value;
        if (selectedOption === "option1") {
            fetchLocationDate();
            const selectedValue = event.target.value;
            setSelectedOption(selectedValue);
        }
        if (selectedOption === "option2") {
            fetchLocationAlpha();
            const selectedValue = event.target.value;
            setSelectedOption(selectedValue);
        } 
        else {
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
                        <img className="w-6" src={filter} alt="" />
                    </a>
                    {showSelect && location.length > 0 && (
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
            {location.length === 0 ? (
                <div>
                    <p className="py-2">Vous n'avez pas encore créé de Localisation.</p>
                    <Link to={ROOT_CREATE_QRCODE.code} className="border border-secondary text-white text-sm rounded-lg block p-2.5 text-center bg-secondary">
                    Créer une Localisation
                    </Link>
                </div>
                ) : location.filter((locationItem) => locationItem.name?.toLocaleLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                <p>Aucune localisation ne correspond à votre recherche.</p>
                ) : (
                location
                    .filter((locationItem) => locationItem.name?.toLocaleLowerCase().includes(searchTerm.toLowerCase()))
                    .map((locationItem, number) => (
                    <div key={locationItem._id} className="w-1/6 bg-white p-4 rounded-lg m-[10px]">
                        <div className="flex justify-center">
                        <QRCodeCanvas
                            id={"location." + number.toString()}
                            value={locationItem.value ?? ""}
                            size={200}
                            bgColor={locationItem.backgroundColor}
                            fgColor={locationItem.foregroundColor}
                            includeMargin={locationItem.includeMargin}
                        />
                        </div>
                        <p className="text-center font-bold pt-1">
                        Créé le:{" "}
                        {locationItem.dateCreation
                            ? `${new Date(locationItem.dateCreation).toLocaleDateString("fr-FR")} ${new Date(locationItem.dateCreation).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
                            : "Date de création: Date inconnue"}
                        </p>
                        <p className="text-center font-bold py-1">
                        Name: {locationItem.name ? locationItem.name : "Nom inconnu"}
                        </p>
                        <div className="flex justify-between">
                        <button onClick={() => deleteLocation(locationItem._id)} className="border border-gray-300 text-sm rounded-lg block p-2.5 hover:bg-error bg-gray-100 hover:text-white">
                            {DELETE}
                        </button>
                        <button onClick={() => downloadLocation('location.' + number.toString(), locationItem.name)} className="border border-gray-300 text-sm rounded-lg block p-2.5 hover:bg-success bg-gray-100 hover:text-white">
                            {DOWNLOAD}
                        </button>
                        </div>
                    </div>
                    ))
                )}
            </div>
        </div>
    )}
export default QrLocationView
