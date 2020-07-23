import React, { useEffect, useState } from 'react';

export default function ErrorMessage({ children }) {
    const [isHidden, setIsHidden] = useState(!children);

    useEffect(() => {
        const timeout = setTimeout(() => setIsHidden(true), 10000);

        return () => clearTimeout(timeout);
    }, []);
    return (
        <>
            {!isHidden && (
                <div className="is-overlay mx-2 my-2">
                    <div className="columns is-pulled-right">
                        <div className="column">
                            <div className="notification is-danger">
                                <button
                                    className="delete"
                                    onClick={() => setIsHidden(true)}
                                ></button>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
