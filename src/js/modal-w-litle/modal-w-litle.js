// startModalWiNoTreiler()
export default function startModalWiNoTreiler() {
    const refs = {
        closeModalBtn: document.querySelector("[data-modal-close]"),
        modal: document.querySelector("[data-modal]"),
      };
      
      refs.closeModalBtn.addEventListener("click", closeModal);
      function toggleModal() {
        refs.modal.classList.toggle("m-w-t-is-hidden");
        document.addEventListener("keydown", Escape);
      }
      function closeModal() {
        refs.modal.classList.toggle("m-w-t-is-hidden");
        document.removeEventListener("keydown", Escape);
      }
      function Escape(event) {
        if (event.key === "Escape") closeModal()
      }
      toggleModal()
}