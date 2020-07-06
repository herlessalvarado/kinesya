import Dialog from "@material-ui/core/Dialog/Dialog";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Link from "@material-ui/core/Link/Link";
import { ACCEPTED_TERMS } from "../../commons/constants";
import { useTranslation } from 'react-i18next';

interface DialogProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export default function ({ open, setOpen }: DialogProps) {
	const { t } = useTranslation('common')

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
			<DialogTitle id="SecurityPolicy">{t("terms.main.title")}</DialogTitle>
			<DialogContent dividers>
				<ul>
					<li>{t("terms.main.first")}</li>
					<li>
						{t("terms.main.second")}
					</li>
					<li>
						{t("terms.main.third")}
					</li>
					<li>
						{t("terms.main.fourth")}
					</li>
					<li>
						{t("terms.main.fifth")}
					</li>
				</ul>
				<p>
					{t("terms.main.sixth")}
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
