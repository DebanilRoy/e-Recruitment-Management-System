import {createContext, useContext, useState} from 'react'

const ConfirmModal = createContext()

export const useConfirmModal = () => useContext(ConfirmModal)

export default function Modal({children}) {
    const [modalState, setModalState] = useState({isOpen: false, message: null, resolve : null})

    
    function showModal(message) {
        return new Promise((resolve) => {
            setModalState({isOpen: true, message: message, resolve})
        })
    }

    console.log(modalState.resolve)
    
    function ModalConfirm() {
        modalState.resolve(true)
        
        setModalState({...modalState, isOpen: false})
    }

    function ModalDeny() {
        modalState.resolve(false)
        setModalState({...modalState, isOpen: false})
    }

    return (
        <ConfirmModal.Provider value={showModal}>
            {children}
            {modalState.isOpen && (
                <div className="confirmModal">
                    <div>
                        <p>{modalState.message}</p>
                        <div>
                            <button onClick={() => ModalConfirm()}>Yes</button>
                            <button onClick={() => ModalDeny()}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmModal.Provider>
    )
}