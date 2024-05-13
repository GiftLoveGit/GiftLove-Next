'use serve'
// import mp4 from "@/assets/videoHome.mp4"

export default function VideoMp4() {
    // console.log(mp4)
    return (
        <video className="rounded-4 img-fluid" controls width="250">
            <source src='@/assets/apresentacao.mp4' type="video/mp4" />
            {/* Mensagem alternativa para navegadores que não suportam vídeo */}
            O seu navegador não suporta a tag vídeo.
          </video>
    );
}