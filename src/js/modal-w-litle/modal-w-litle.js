// startModalWiNoTreiler()
export default function startModalWiNoTreiler() {
    const refs = {
        closeModalBtn: document.querySelector("[data-modal-close]"),
        modal: document.querySelector("[data-modal]"),
      };
      
      refs.closeModalBtn.addEventListener("click", closeModal);
      function toggleModal() {
        document.body.style.overflow = 'hidden'; 
        refs.modal.classList.toggle("m-w-t-is-hidden");
        document.addEventListener("keydown", Escape);
      }
      function closeModal() {
        refs.modal.classList.toggle("m-w-t-is-hidden");
        document.removeEventListener("keydown", Escape);
        document.body.style.overflow = 'visible'; 
      }
      function Escape(event) {
        if (event.key === "Escape") closeModal()
      }
      toggleModal()
}