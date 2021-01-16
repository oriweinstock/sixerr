import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

export function GigImgLightBox({ currImg, onToggleImgLightbox, onNextPageLightBox, onPrevPageLightBox }) {
    return (
        <section className="img-light-box" onClick={() => onToggleImgLightbox()}>
            <div>
                <img src={currImg} />
                <CloseIcon className="close-light-box" onClick={() => onToggleImgLightbox()} />
                <SkipNextIcon className="next-img" onClick={(ev) => onNextPageLightBox(ev)} />
                <SkipPreviousIcon className="prev-img" onClick={(ev) => onPrevPageLightBox(ev)} />
            </div>
        </section>
    )
}
