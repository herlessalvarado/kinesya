import { Photo } from "../components/photo/Photo";
import avatar from "../assets/avatar.jpg"

export const DISTRICTS = [
    "Breña",
    "La Victoria",
    "Centro de Lima",
    "Lince",
    "Rímac",
    "Barranco",
    "Jesús María",
    "La Molina",
    "Magdalena",
    "Miraflores",
    "Pueblo Libre",
    "San Borja",
    "San Isidro",
    "San Luis",
    "San Miguel",
    "Santiago de Surco",
    "Surquillo",
    "Ate",
    "Cieneguilla",
    "Chaclacayo",
    "San Juan de Lurigancho",
    "El Agustino",
    "Chosica",
    "Santa Anita",
    "Ancón",
    "Carabayllo",
    "Comas",
    "Independencia",
    "Los Olivos",
    "Puente Piedra",
    "San Martín de Porres",
    "Santa Rosa",
    "Chorrillos",
    "Lurín",
    "Pachacamac",
    "Pucusana",
    "Punta Hermosa",
    "Punta Negra",
    "San Bartolo",
    "San Juan de Miraflores",
    "Santa María del Mar",
    "Villa el Salvador",
    "Villa María del Triunfo",
]
export const SERVICES = [
    "Seleccionar",
    "Trato de pareja",
    "Sexo oral",
    "Sexo anal",
    "Oral con condón",
    "Oral natural",
    "Eyaculación facial",
    "Masajes",
    "Fantasías",
    "Trío",
    "Beso Negro",
    "Fetichismo",
    "Sado duro",
    "Sado suave",
]

export const Zodiac = [
    "Aries",
    "Tauro",
    "Géminis",
    "Cáncer",
    "Leo",
    "Virgo",
    "Libra",
    "Escorpio",
    "Sagitario",
    "Capricornio",
    "Acuario",
    "Piscis",
]

export const Eyes = [
    "Marrón",
    "Ambar",
    "Avellana",
    "Verde",
    "Azul",
    "Gris",
    "Negro",
]

export const Hair = [
    "Negro",
    "Castaño",
    "Rubio",
    "Pelirrojo",
    "Blanco",
    "Gris",
]

function createDefaultPhotos(){
    const photos = new Array<Photo>()
    for (let index = 0; index < IMAGE_LIMITS; index++) {
        photos.push({
            file: "",
            srcUrl: DEFAULT_PHOTO,
        });
    }
    return photos
}

export const Ethnicities = ["Andinas", "Morenas", "Piel Blanca", "Trigueña"]

export const Orientations = ["Heterosexual", "Homosexual", "Bisexual", "Trans"]
export const IMAGE_LIMITS = 4
export const MAX_AGE = 99
export const MIN_PRICE = 0.0
export const API_COUNTRIES = "https://country.register.gov.uk/records.json?page-size=5000"


// export const MIN_AGE = moment().subtract(18, "years").toDate()
export const DEFAULT_PHOTO = avatar
export const MAX_STEPS_PROFILE = 3
export const DATE_FORMAT = "MM/dd/yyyy"
export const DEFAULT_PHOTOS = createDefaultPhotos()
export const PREFIX_NUMBER = "+51"
export const ACCEPTED_TERMS = "accepted-policy"

