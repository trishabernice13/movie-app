export default class Paginator {
  constructor(adapter = {}) {
    this.adapter = Object.assign(this.defaultAdapter, adapter);
    this.page = 1;
    this.totalPage = null;
    this.isRunning = false;
    this.stopLoading = false;
  }

  get defaultAdapter() {
    return {
      getPageData: (/* page */) => {
        /* promise */
      },
      getTotalPage: (/* response */) => {
        /* integer */
      },
      onPageLoad: (/* response */) => {
        /* Emits on successful page load */
      },
      stopLoading: (/* response */) => {
        // boolean
      }
    };
  }

  get hasMorePages() {
    return this.page < (this.totalPage || !this.stopLoading);
  }

  loadPage = (page, options = {}) => {
    const sequentially = options.sequentially || true;

    if (sequentially && this.isRunning) return;

    return this.adapter
      .getPageData(page)
      .then(response => {
        this.totalPage = this.adapter.getTotalPage(response);
        this.page = page;
        this.stopLoading = this.adapter.stopLoading(response);
        this.adapter.onPageLoad(response);
        return response;
      })
      .finally(() => {
        this.isRunning = false;
      })
      .catch(err => {
        console.error(err);
      });
  };

  nextPage = () => this.loadPage(this.page + 1);

  prevPage = () => this.loadPage(this.page - 1);
}
