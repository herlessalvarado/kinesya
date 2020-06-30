import React, { useState, createRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Photo } from "../../photo/Photo";
import { MAX_STEPS_PROFILE, DEFAULT_PHOTOS } from "../../../commons/constants";
import { UserStateProps } from "../../../models/user";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";
import PhotoF, { CropperPhoto } from "../../photo/Photo";
import { FileButton } from "../../helpers/InputFile";

export default function Photos(props: UserStateProps) {
	const classes = useStyles();
	const { t } = useTranslation("common");
	const [profilePhoto, setProfile] = useState(props.user.profilePhoto);
	const [bannerPhoto, setBanner] = useState(props.user.bannerPhoto);
	const [referencePhotos, setReferences] = useState(props.user.referencePhotos);
	const refProfile = createRef<HTMLInputElement>();
	const refBanner = createRef<HTMLInputElement>();

	const handleProfile = (photo: Photo, index: number) => {
		profilePhoto[index] = photo;
		setProfile([...profilePhoto]);
	};
	const handleBanner = (photo: Photo,index:number) => {
		bannerPhoto[index] = photo;
		setBanner([...bannerPhoto]);
	};

	const handleReferencesByIndex = (photo: Photo, index: number) => {
		referencePhotos[index] = photo;
		setReferences([...referencePhotos]);
	};

	const handleReferences = (event:React.ChangeEvent<HTMLInputElement>)=>{
		if (!!event.target.files) {
			const photos:Photo[] = []
			for (let index = 0; index < event.target.files.length; index++) {
				photos.push(
					{
						file: event.target.files.item(index) as File,
						srcUrl: window.URL.createObjectURL(event.target.files.item(index))
					}
				)
				
			}
			const _photos = referencesPhotos(photos)
			setReferences(_photos)
		}
	}
	function referencesPhotos(references:Photo[]){
		const photos = [...DEFAULT_PHOTOS]
		for (let index = 0; index < references.length; index++) {
			photos[index] = references[index]
		
	}
	return photos
}

	function areAllValid() {
		return !!profilePhoto[0].file && !!bannerPhoto[0].file
	}

	return (
		<React.Fragment>
			<Grid container direction="column" spacing={1}>
				<Grid item container justify="space-between">
					<Grid item>
						<Typography variant="h6">
							{t("dashboard.profile.image.profile")}
						</Typography>
					</Grid>
					<Grid item>
						<Button
							onClick={() => {
								refProfile.current?.click();
							}}
							color="primary"
						>
							{t("dashboard.profile.image.upload")}
						</Button>
					</Grid>
				</Grid>
				<Grid item container justify="center">
					<Grid item>
						<div
							className={classes.profileSize}
						>
							<CropperPhoto
								ref={refProfile!}
								key={profilePhoto[0].srcUrl}
								index={0}
								onChange={handleProfile}
								value={profilePhoto[0]}
								ratio="1:1"
							/>
						</div>
					</Grid>
				</Grid>
				<Grid item container justify="space-between">
					<Grid item>
						<Typography variant="h6">
							{t("dashboard.profile.image.cover")}
						</Typography>
					</Grid>
					<Grid item>
						<Button
							onClick={() => {
								refBanner.current?.click();
							}}
							color="primary"
						>
							{t("dashboard.profile.image.upload")}
						</Button>
					</Grid>
				</Grid>
				<Grid item container justify="center">
					<Grid item>
						<div
							className={classes.coverSize}
						>
							<CropperPhoto
								ref={refBanner!}
								key={bannerPhoto[0].srcUrl}
								index={0}
								onChange={handleBanner}
								value={bannerPhoto[0]}
								ratio="16:9"
							/>
						</div>
					</Grid>
				</Grid>
				<Grid item container direction="column" justify="space-between">
					<Grid item container justify="space-between">
						<Grid item>
							<Typography variant="h6">
								{t("dashboard.profile.image.featured")}
							</Typography>
						</Grid>
						<Grid item>
						<FileButton {...{onChange:handleReferences,text:t("dashboard.profile.image.upload")}} />
					</Grid>
					</Grid>
					<Grid item container justify="center">
						<Grid item>
							<div
							className={classes.referencesSize}
							>
								{referencePhotos?.map((photo: Photo, index: number) => (
									<div
										key={index}
										style={{
											display: "flex",
											width: "106px",
											height: "106px",
											borderRadius: "8px",
											margin: "5px",
										}}
									>
										<PhotoF
											index={index}
											value={photo}
											onChange={handleReferencesByIndex}
										/>
									</div>
								))}
							</div>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<div className={classes.buttons}>
				{props.stepId > 0 && (
					<Button
						onClick={() => {
							props.onClick(
								{ ...props.user, profilePhoto, bannerPhoto, referencePhotos },
								props.stepId - 1
							);
						}}
						className={classes.button}
					>
						{t("dashboard.profile.continue.back")}
					</Button>
				)}
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					disabled={!areAllValid()}
					onClick={() => {
						props.onClick(
							{ ...props.user, profilePhoto, bannerPhoto, referencePhotos },
							props.stepId + 1
						);
					}}
				>
					{props.stepId === MAX_STEPS_PROFILE
						? t("dashboard.profile.continue.confirm")
						: t("dashboard.profile.continue.next")}
				</Button>
			</div>
		</React.Fragment>
	);
}
