import React from "react";

export function onSVGButtonClick(svgRef: React.MutableRefObject<null>) {
    // On transforme le QRCOde en XML avant le téléchargement
    const node = svgRef.current
    if (node == null) {
        return
    }
    const serializer: XMLSerializer = new XMLSerializer()
    const fileURI: string =
        'data:image/svg+xml;charset=utf-8,' +
        encodeURIComponent(
            '<?xml version="1.0" standalone="no"?>' +
            serializer.serializeToString(node)
        )

    downloadStringAsFile(fileURI, 'qrcode-svg.svg')
}

export const downloadQRCode = (id: string) => {
    const canvas = document.getElementById(id) as HTMLCanvasElement
    if (!canvas) throw new Error("<canvas> not found in the DOM")
    const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
    const downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = "QR code.png"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
}

export function downloadStringAsFile(data: string, filename: string) {
    let a: HTMLAnchorElement = document.createElement('a')
    a.download = filename
    a.href = data
    a.click()
}