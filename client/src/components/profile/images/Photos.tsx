import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import UploadImage, { Photo } from "../../photo/UploadImage";
import { MAX_STEPS_PROFILE } from "../../../commons/constants";
import { UserStateProps } from "../../../models/user";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";
import PhotoF from "../../photo/Photo";

export default function Photos(props: UserStateProps) {
	const classes = useStyles();
	const { t } = useTranslation("common");
	const [profilePhoto, setProfile] = useState(props.user.profilePhoto);
	const [bannerPhoto, setBanner] = useState(props.user.bannerPhoto);
	const [referencePhotos, setReferences] = useState(props.user.referencePhotos);
	

	const handleProfile = (photo: Photo) => {
		setProfile([photo]);
	};
	const handleBanner = (photo: Photo) => {
		setBanner([photo]);
	};

	const handleReferences = (photo: Photo, index: number) => {
		referencePhotos[index] = photo;
		setReferences([...referencePhotos]);
	};
	function areAllValid() {
		return (
			profilePhoto.length > 0 &&
			bannerPhoto.length > 0 &&
			referencePhotos.length > 0
		);
	}

	return (
		<React.Fragment>
			<Grid container direction="column" spacing={1}>
				<UploadImage
					type="profile"
					onChange={handleProfile}
					value={profilePhoto}
				/>
				<UploadImage type="cover" onChange={handleBanner} value={bannerPhoto} />
				<Grid item container direction="column" justify="space-between">
					<Grid item container justify="space-between">
						<Grid item>
							<Typography variant="h6">
								{t("dashboard.profile.image.featured")}
							</Typography>
						</Grid>
					</Grid>
					<Grid item container justify="center">
						<Grid item >
                            
                            <div style={{display:"flex",justifyContent:"center", width:"300px", flexWrap:"wrap"}}>
                            {referencePhotos?.map((photo: Photo, index: number) => (
                                    <div style={{ display:"flex", width:"106px",height:"106px",borderRadius:"8px",margin:"5px"}}>
                                        
                                    <PhotoF
									index={index}
                                    value={photo}
									onChange={handleReferences}
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
