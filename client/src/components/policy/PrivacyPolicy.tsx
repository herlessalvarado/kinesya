import React from "react";
import { useTranslation } from 'react-i18next';

export default  function (){
	const { t } = useTranslation('common')

    return (
		<React.Fragment>
			<h1>{t("terms.policy.title")}</h1>
		</React.Fragment>
	);
}