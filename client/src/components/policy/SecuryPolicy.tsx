import Dialog from "@material-ui/core/Dialog/Dialog";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Link from "@material-ui/core/Link/Link";
import { ACCEPTED_TERMS } from "../../commons/constants";

interface DialogProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export default function ({ open, setOpen }: DialogProps) {
	function handleClose() {
		localStorage.setItem(ACCEPTED_TERMS, "true");
		setOpen(false);
	}

	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			maxWidth="xs"
			aria-labelledby="SecurityPolicy"
			scroll="paper"
			open={open}
		>
			<DialogTitle id="SecurityPolicy">Politicas de Seguridad</DialogTitle>
			<DialogContent dividers>
				<ul>
					<li>Tengo m&aacute;s de 18 a&ntilde;os</li>
					<li>
						No se permite la publicaci&oacute;n de ning&uacute;n anuncio que
						contenga referencias sobre servicios sexuales a cambio de dinero
					</li>
					<li>
						No se permite adjuntar im&aacute;genes pornogr&aacute;ficas que
						muestren &oacute;rganos genitales expl&iacute;citamente
					</li>
					<li>
						La inserci&oacute;n de material ped&oacute;filo, incluidos todos los
						datos de acceso, se comunicar&aacute; inmediatamente a las
						autoridades competentes a fin de llegar a los responsables
						implicados
					</li>
					<li>
						Al publicar el anuncio en Kinesya, el Usuario certifica que puede
						acceder al contenido con todos los derechos y tambi&eacute;n declara
						que las im&aacute;genes pertenecen a personas mayores de edad
						(mayores de 18 a&ntilde;os), que han dado su consentimiento para
						publicarlas en Kinesya.
					</li>
				</ul>
				<p>
					Al hacer clic en el bot&oacute;n &ldquo;aceptar&rdquo;, el usuario
					declara se mayor de 18 a&ntilde;os y exime de toda responsabilidad a
					los proveedores de estos servicios, propietarios y creadores de
					Kinesya.com sobre los contenidos y sobre el uso que se haga de la
					secci&oacute;n.
				</p>
			</DialogContent>
			<DialogActions>
				<Link
					href="https://www.google.com/"
					style={{ textDecoration: "none" }}
					color="primary"
				>
					Dismiss
				</Link>
				<Button
					onClick={() => {
						handleClose();
					}}
					color="primary"
				>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}
