import Croppie from "croppie"
import React, { useEffect, useRef, useState } from "react"
import { Photo } from "./UploadImage"
import { Button } from "@material-ui/core"
export type ImageRatio = "1:1" | "16:9"

interface CropperProps {
    onChange: (photo: Photo) => void
    origin: Photo,
    ratio: ImageRatio
}
export default (props: CropperProps) => {
    const croppingArea = useRef<HTMLDivElement>(null)
    const [croppie,setCroppie] = useState<Croppie>();


    function handleSave() {
        croppie?.result({
                type: "blob",
                size: "original",
                format: "png",
            })
            .then((data: Blob) => {
                const file = new File([data], props.origin.file!.name, {
                    type:data.type
                })

                props.onChange({ file, url: window.URL.createObjectURL(file) })
            })
    }

    function createCroppie() {
        let _croppie;
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
            url: props.origin.url!,
            zoom: 0,
        })
        return _croppie;
    }


    useEffect(() => {
        let valid = true
        if (valid && !!croppingArea.current){
            setCroppie(createCroppie())
        }
        return () => {
            valid = false
            croppie?.destroy();
        }
    }, [])

    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                <div ref={croppingArea}></div>
                <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                onClick={handleSave}
                            >
                                Guardar
                            </Button>
        </div>

    )
}
     