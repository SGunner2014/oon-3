import React from 'react';

const WonPrompt = ({score, click}) => {
    return (
        <div className="prompt-backing">
            <div className="prompt">
                {
                    !score &&
                        <h1>You got one!</h1>
                }
                {
                    score > 0 &&
                        <h1>You got another one!</h1>
                }
                <hr/>
                <h4 className="mb-2 mt-2">Want to try again?</h4>
                <button className="btn btn-md btn-success" onClick={click}>Hit me with another!</button>
            </div>
        </div>
    );
};

const LostPrompt = ({score, click}) => {
    return (
        <div className="prompt-backing">
            {/* <div className="prompt">

            </div> */}
        </div>
    );
};

export {
    WonPrompt,
    LostPrompt
};