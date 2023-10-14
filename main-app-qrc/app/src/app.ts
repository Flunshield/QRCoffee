import {
    deleteLocation,
    deleteQrcode,
    deleteVcard,
    getAllLocationSortedAlphabetically,
    getAllLocationSortedByCreationDate,
    getAllQrcodesSortedAlphabetically,
    getAllQrcodesSortedByCreationDate,
    getAllVcardsSortedAlphabetically,
    getAllVcardsSortedByCreationDate,
    getLocationById,
    getQrcodeById,
    getVcardById,
    pushLocation,
    pushQrcode,
    pushVcard
} from "./Services/QrcodeService";
import express, {Application, Request, Response} from "express";
import bodyParser from "body-parser";
import {Contact, ModelVcard, Qrcode} from "./Interfaces/QrcodeInterface";
import {transporter} from "./Services/MailService";
import {getMemberIsPremium} from "./Services/ClerkService";
import {verifyJwt} from "./MiddleWare/jwt-utils";

require('dotenv').config();

export {app};

const cors = require('cors')
const app: Application = express();
const port: number = 3000;

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.post('/pushQrcode', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: Qrcode = req.body
        await pushQrcode(data)
        res.status(201).send('Ok');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.post('/pushVcard', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: ModelVcard = req.body
        await pushVcard(data)
        res.status(201).send('Ok');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.post('/location', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: Qrcode = req.body
        await pushLocation(data)
        res.status(201).send('Ok');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getQrcode/:id', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: string = req.params.id
        const tabQrCode = await getQrcodeById(data)
        res.json(tabQrCode)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getVcard/:id', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: string = req.params.id
        const tabVcard = await getVcardById(data)
        res.json(tabVcard)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getQrcodesFilterAlphabetically/:id', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: string = req.params.id
        const qrcodes = await getAllQrcodesSortedAlphabetically(data);
        res.json(qrcodes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getVcardsFilterAlphabetically/:id', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: string = req.params.id
        const vcards = await getAllVcardsSortedAlphabetically(data);
        res.json(vcards);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getLocationFilterAlphabetically/:id', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: string = req.params.id
        const location = await getAllLocationSortedAlphabetically(data);
        res.json(location);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getLocation/:id', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: string = req.params.id
        const tabQrCode = await getLocationById(data)
        res.json(tabQrCode)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getQrcodesFilterCreationDate/:id', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: string = req.params.id
        const qrcodes = await getAllQrcodesSortedByCreationDate(data);
        res.json(qrcodes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getVcardsFilterCreationDate/:id', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: string = req.params.id
        const vcards = await getAllVcardsSortedByCreationDate(data);
        res.json(vcards);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getLocationFilterCreationDate/:id', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: string = req.params.id
        const location = await getAllLocationSortedByCreationDate(data);
        res.json(location);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.delete('/deleteQrcode', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: Qrcode = req.body
        await deleteQrcode(data)
        const tabQrCode = await getQrcodeById(data.idClerk)
        res.json(tabQrCode)
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.post('/sendContact', (req: Request, res: Response, err) => {
    try {
        const data: Contact = req.body
        const htmlContent: string = `
          <p>Username : ${data.username}</p>
          <p>Mail a contacter : ${data.email}</p>
          <h2>Message :</h2>
          <p>${data.message}</p>
        `;
        const mailOptions = {
            from: process.env.MAIL,
            to: `${process.env.MAIL_TO}, ${data.email}`,
            subject: 'Prise de contact',
            html: htmlContent
        };

        transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
            if (error) {
                console.log(error);
                res.status(500)
                res.send('Erreur lors de l\'envoi de l\'e-mail.');
            } else {
                console.log('E-mail envoyé: ' + info.response);
                res.send('E-mail envoyé avec succès.');
            }
        });

        res.status(200)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.delete('/deleteVcard', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: ModelVcard = req.body
        await deleteVcard(data)
        const tabVcard = await getVcardById(data.idClerk)
        res.json(tabVcard)
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.delete('/deleteLocation', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        const data: Qrcode = req.body
        await deleteLocation(data)
        const tabQrCode = await getLocationById(data.idClerk)
        res.json(tabQrCode)
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.post('/getRoleAdmin', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        console.log("test")
        const data: Qrcode = req.body
        pushQrcode(data)
        res.status(200).send('Ok');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getRolePremium', verifyJwt(), async (req: Request, res: Response, err) => {
    try {
        await getMemberIsPremium("user_2T3PJp1ZZEobrAXXED0vJtsSobN")
        res.status(200)

    } catch (error) {
        res.status(500).send('Internal server error');
    }
});


app.listen(port, () => {
    console.log(`connecter parfaitement au port ${port}`)
});
