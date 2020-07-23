import React from 'react';

export default function ConfirmationModal({ onConfirm, onCancel, children }) {
    return (
        <div className={`modal ${onConfirm ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={onCancel}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <strong>Confirmation</strong>
                </header>
                <section className="modal-card-body">{children}</section>
                <footer className="modal-card-foot">
                    <button
                        type="button"
                        className="button is-success"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    <button type="button" className="button" onClick={onCancel}>
                        Cancel
                    </button>
                </footer>
            </div>
            <button
                className="modal-close is-large"
                aria-label="close"
                onClick={onCancel}
            ></button>
        </div>
    );
}
