import express, { response } from 'express';
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

// OPEN AI key setup
const configuration = new Configuration({
    apikey: process.env.OPEN_AI_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req,res)=>{
    res.send("Hello")
})

//AI image fetching logic
router.route('/').post(async(req,res)=>{
    try {
        const { prompt } = req.body

        const aiResponse = await createImage ({
            prompt,
            n:1,
            size: '1024*1024',
            response_format:'b64_json'
        })

        const image = aiResponse.data.data[0].b64_json
        res.status(200).json({ photo : image});
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message)
    }
})

export default router;