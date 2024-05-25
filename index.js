import express from 'express'
import 'dotenv/config'
import Jimp from 'jimp'


const app = express()


app.get('/image', async (req, res) => {

    const image = await Jimp.read('https://picsum.photos/400')
    //agregar config a la imagen:
    const buffer = await image
        .resize(350, 350)
        .grayscale()
        .getBufferAsync(Jimp.MIME_JPEG)

    res.set("Content-Type", "image/jpeg")
    return res.send(buffer)

})







const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`servidor escuchando en puerto ${PORT}`)
})