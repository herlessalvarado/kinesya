import moment from "moment"

export const DISTRICTS = [
    "",
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
    "",
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

export const Ethnicities = ["", "Andinas", "Morenas", "Piel Blanca", "Trigueña"]

export const Orientations = ["", "Heterosexual", "Homosexual", "Bisexual", "Trans"]
export const IMAGE_LIMITS = 4
export const MAX_AGE = 99
export const MIN_PRICE = 0.0
export const MIN_AGE = moment().subtract(18, "years").toDate()
export const DEFAULT_PHOTO = "https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png"
export const MAX_STEPS_PROFILE = 3
