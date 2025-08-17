import React from "react";

export default function Modal({children}) {

    const [showModal, setShowModal] = React.useState(true);

    return (
        <div
            class="modal-background"
            style={{
                display: showModal ? "flex" : "none",
            }}
        >
            <div class="modal-body">

                {children}

                <button
                    class="close-button"
                    onClick={() => {
                        setShowModal(false);
                    }}
                >
                    close
                </button>
            </div>
        </div>
    );
}
