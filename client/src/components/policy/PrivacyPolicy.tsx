import React from "react";
import { useTranslation } from 'react-i18next';

export default  function (){
	const { t } = useTranslation('common')

    return (
		<React.Fragment>
			<h1>{t("terms.policy.title")}</h1>
			<p>{t("terms.policy.first")}</p>
			<p>{t("terms.policy.second")}</p>
			<p>{t("terms.policy.third")}</p>
			<p>{t("terms.policy.fourth")}</p>
			<ol>
				<li>{t("terms.policy.info")}</li>
			</ol>
			<ul>
				<li>
					{t("terms.policy.fifth")}
				</li>
			</ul>
			<p>{t("terms.policy.sixth")}</p>
			<ol>
				<li>{t("terms.policy.how")}</li>
				<ul>
					<li>{t("terms.policy.archive")}</li>
					<p>{t("terms.policy.seventh")}</p>
					<li>{t("terms.policy.cookies")}</li>
					<p>{t("terms.policy.eighth")}</p>
					<li>{t("terms.policy.own")}</li>
					<p>{t("terms.policy.nineth")}</p>
					<p>{t("terms.policy.tenth")}</p>
					<li>{t("terms.policy.party")}</li>
					<p>{t("terms.policy.eleventh")}</p>
					<p>{t("terms.policy.twelveth")}</p>
					<li>{t("terms.policy.preferences")}</li>
					<p>{t("terms.policy.thirteenth")}</p>
					<li>{t("terms.policy.another")}</li>
					<p>{t("terms.policy.fourteenth")}</p>
					<p>{t("terms.policy.fifteenth")}</p>
					<li>{t("terms.policy.transfer")}</li>
					<li>{t("terms.policy.assignment")}</li>
					<p>{t("terms.policy.sixteenth")}</p>
					<li>{t("terms.policy.protect")}</li>
					<p>{t("terms.policy.seventeenth")}</p>
					<li>{t("terms.policy.eighteenth")}</li>
					<p>{t("terms.policy.nineteenth")}</p>
					<li>{t("terms.policy.twentieth")}</li>
					<p>{t("terms.policy.twentyfirst")}</p>
					<p>{t("terms.policy.twentysecond")}</p>
					<li>{t("terms.policy.age")}</li>
					<p>{t("terms.policy.twentythird")}</p>
					<li>{t("terms.policy.security")}</li>
					<p>{t("terms.policy.twentyfourth")}</p>
					<li>{t("terms.policy.twentyfifth")}</li>
					<p>{t("terms.policy.twentysixth")}</p>
					<li>{t("terms.policy.twentyseventh")}</li>
					<p>{t("terms.policy.twentyeighth")}</p>
					<li>{t("terms.policy.twentynineth")}</li>
					<p>{t("terms.policy.thirty")}</p>
					<li>{t("terms.policy.thirtyfirst")}</li>
					<p>{t("terms.policy.thirtysecond")}</p>
					<li>{t("terms.policy.thirtythird")}</li>
					<p>{t("terms.policy.thirtyfourth")}</p>
				</ul>
			</ol>
		</React.Fragment>
	);
}
