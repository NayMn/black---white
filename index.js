import express from 'express'
import 'dotenv/config'
import Jimp from 'jimp'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { randomUUID } from 'crypto'


const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);


app.use(express.static(path.join()))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"))
})


app.post('/image', async (req, res) => {

    const imageUrl = req.body.imageUrl

    try {

    } catch (error) {
        res.status(500).send('no se puede procesar la imagen')
    }

    const image = await Jimp.read('https://picsum.photos/400')
    //agregar config a la imagen:
    const buffer = await image
        .resize(350, 350)
        .grayscale()
        .getBufferAsync(Jimp.MIME_JPEG)


    //guardar la imagen:
    const dirname = __dirname + `/public/img/image-${randomUUID()}.jpeg`
    await image.writeAsync(dirname)

    res.set("Content-Type", "image/jpeg")
    return res.send(buffer)

})







const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`servidor escuchando en puerto ${PORT}`)
})