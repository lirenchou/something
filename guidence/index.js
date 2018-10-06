class Guidences {
  
  constructor() {
    this.modal = null;
    this.eleList = [];
  }

  showGuidences(eleList = []) {
    this.eleList = eleList instanceof Array ? eleList : [eleList];
    this.modal || this.createModel();
    this.showGuidence(eleList);
  }

  showGuidence() {
    if (!this.eleList.length) {
      return this.hideModal();
    }
    this.modalBody && this.modal.removeChild(this.modalBody);
    const ele = this.eleList.shift();
    const newEle = ele.cloneNode(true);
    this.modalBody = newEle;
    this.initModalBody(ele);
    this.showModal();
  }

  createModel() {
    const modalContainer = document.createElement('div');
    const modalMask = document.createElement('div');
    this.setMaskStyle(modalMask);
    modalContainer.appendChild(modalMask);
    modalContainer.style.display = 'none';
    this.modal = modalContainer;
    document.body.appendChild(this.modal);
  }

  setMaskStyle(ele) {
    ele.style.zIndex = '1000';
    ele.style.background = 'rgba(0, 0, 0, 0.8)';
    ele.style.position = 'fixed';
    ele.style.top = 0;
    ele.style.right = 0;
    ele.style.bottom = 0;
    ele.style.left = 0;
  }

  initModalBody(target) {
    this.adapteView(target);
    const rect = target.getBoundingClientRect();
    this.modalBody.style.zIndex = '1001';
    this.modalBody.style.position = 'fixed';
    this.modalBody.style.width = `${rect.width}px`;
    this.modalBody.style.height = `${rect.height}px`;
    this.modalBody.style.left = `${rect.left}px`;
    this.modalBody.style.top = `${rect.top}px`;
    this.modal.appendChild(this.modalBody);
    this.modalBody.addEventListener('click', () => {
      this.showGuidence(this.eleList);
    });
  }
  // 若引导的元素不在页面范围内，则滚动到引导元素的视野范围内。
  adapteView(ele) {
    const rect = ele.getBoundingClientRect();
    const height = window.innerHeight;
    if (rect.top < 0) {
      window.scrollBy(0, rect.top);
      return true;
    } else if (rect.top > height - rect.height) {
      window.scrollBy(0, rect.top + rect.height - height);
      return true;
    }
    return false;
  }
  hideModal() {
    this.modal.style.display = 'none';
    this.modal.removeChild(this.modalBody);
    this.modalBody = null;
  }

  showModal() {
    this.modal.style.display = 'block';
  }

}