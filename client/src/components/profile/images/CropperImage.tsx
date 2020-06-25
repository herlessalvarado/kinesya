import Croppie from "croppie"
import React, { useEffect, useRef, useState } from "react"
import { Photo } from "../../photo/Photo"
import { Button } from "@material-ui/core"
import { useTranslation } from "react-i18next";
import imageCompression from 'browser-image-compression';
import Loading from '../../progress/Loading';

export type ImageRatio = "1:1" | "16:9"

export interface CropperProps {
    onChange: (photo: Photo) => void
    origin: Photo
    ratio: ImageRatio
}

const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
}

export default (props: CropperProps) => {
    const { t } = useTranslation("common")
    const croppingArea = useRef<HTMLDivElement>(null)
    const [croppie, setCroppie] = useState<Croppie>()
    const [loading, setLoading] = useState(false)

    function handleSave() {
        setLoading(true)
        croppie
            ?.result({
                type: "blob",
                size: "original",
                format: "png"
            })
            .then(async (data: Blob) => {
                const file = new File([data], props.origin.file!.name, {
                    type: data.type,
                })
                const compressedFile = await imageCompression(file, options);
                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                setLoading(false)
                props.onChange({ file: compressedFile, srcUrl: window.URL.createObjectURL(compressedFile) })
            })
    }

    function createCroppie() {
        let _croppie
        if (props.ratio === "16:9") {
            _croppie = new Croppie(croppingArea.current!, {
                viewport: { width: 300, height: 200 },
                boundary: { width: 300, height: 300 },
                enableExif: true,
            })
        } else {
            _croppie = new Croppie(croppingArea.current!, {
                viewport: { width: 200, height: 200 },
                boundary: { width: 300, height: 300 },
                enableExif: true,
            })
        }
        _croppie.bind({
            url: props.origin.srcUrl!,
            zoom: 0,
        })
        return _croppie
    }

    useEffect(() => {
        let valid = true
        if (valid && !!croppingArea.current) {
            setCroppie(createCroppie())
        }
        return () => {
            valid = false
            croppie?.destroy()
        }
    }, [])

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div ref={croppingArea}></div>
            {
                loading ? 
                <Loading />
                :
                <Button fullWidth variant="outlined" color="primary" onClick={handleSave}>
                    {t("dashboard.profile.image.save")}
                </Button>
            }
        </div>
    )
}
