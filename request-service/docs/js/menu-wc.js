'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">part-library documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/LibraryModule.html" data-type="entity-link" >LibraryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"' : 'data-bs-target="#xs-controllers-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"' :
                                            'id="xs-controllers-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"' }>
                                            <li class="link">
                                                <a href="controllers/LibraryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LibraryController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/LibraryProcessController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LibraryProcessController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"' : 'data-bs-target="#xs-injectables-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"' :
                                        'id="xs-injectables-links-module-LibraryModule-b6820995c2883832817ca3913581ddf2b2fca16cf6cb6cc3b9cf46665de387d8d7b496b1d5804b7442f65a27a06ff4a7827006f76b282352120ffe79dc2bd829"' }>
                                        <li class="link">
                                            <a href="injectables/BookRequestFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookRequestFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BookRequestMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookRequestMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BookRequestRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookRequestRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BookRequestRetryJob.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookRequestRetryJob</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BookRequestUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookRequestUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BookReservationUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookReservationUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NoticeProxy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoticeProxy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProcessBookProxy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProcessBookProxy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/LibraryController.html" data-type="entity-link" >LibraryController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LibraryProcessController.html" data-type="entity-link" >LibraryProcessController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseFactory.html" data-type="entity-link" >BaseFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseRepository.html" data-type="entity-link" >BaseRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseSchema.html" data-type="entity-link" >BaseSchema</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookRequestDto.html" data-type="entity-link" >BookRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookRequestEntity.html" data-type="entity-link" >BookRequestEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookRequestSchema.html" data-type="entity-link" >BookRequestSchema</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeBookRequestStatusCommand.html" data-type="entity-link" >ChangeBookRequestStatusCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeBookRequestStatusEvent.html" data-type="entity-link" >ChangeBookRequestStatusEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeBookRequestStatusEventHandler.html" data-type="entity-link" >ChangeBookRequestStatusEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeBookRequestStatusHandler.html" data-type="entity-link" >ChangeBookRequestStatusHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBookRequestCommand.html" data-type="entity-link" >CreateBookRequestCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBookRequestEvent.html" data-type="entity-link" >CreateBookRequestEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBookRequestEventHandler.html" data-type="entity-link" >CreateBookRequestEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBookRequestHandler.html" data-type="entity-link" >CreateBookRequestHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllBookRequestsHandler.html" data-type="entity-link" >GetAllBookRequestsHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllBookRequestsQuery.html" data-type="entity-link" >GetAllBookRequestsQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetBookRequestHandler.html" data-type="entity-link" >GetBookRequestHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetBookRequestQuery.html" data-type="entity-link" >GetBookRequestQuery</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BookRequestFactory.html" data-type="entity-link" >BookRequestFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookRequestMapper.html" data-type="entity-link" >BookRequestMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookRequestRepository.html" data-type="entity-link" >BookRequestRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookRequestRetryJob.html" data-type="entity-link" >BookRequestRetryJob</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookRequestUseCase.html" data-type="entity-link" >BookRequestUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookReservationUseCase.html" data-type="entity-link" >BookReservationUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NoticeProxy.html" data-type="entity-link" >NoticeProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProcessBookProxy.html" data-type="entity-link" >ProcessBookProxy</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BaseMapper.html" data-type="entity-link" >BaseMapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BookProcessResultInterface.html" data-type="entity-link" >BookProcessResultInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BookRequestInterface.html" data-type="entity-link" >BookRequestInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterType.html" data-type="entity-link" >FilterType</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});