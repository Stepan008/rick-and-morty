import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { withRamService } from '../hoc-helpers';
import { Link } from 'react-router-dom';
import './char-list.scss';
import CharListItem from '../char-list-item';

const CharList = ({ramService}) => { 

    const[chars, setChars] = useState([]);
    const[itemsQuantity, setItemsQuantity] = useState(0);
    const[status, setStatus] = useState('');
    const[gender, setGender] = useState('');
    const[filter, setFilter] = useState('');
    const[page, setPage] = useState(1);

    useEffect(() => {
        fetchChars();
    }, [filter, page]);

    const fetchChars = () => {
        const firstElement = page * 12 - 11;
        const lastElement = page * 12;
        const firstPage = Math.ceil(firstElement / 20);
        const lastPage = Math.ceil(lastElement / 20);
        const startIndex = firstElement - (firstPage * 20 - 19);
        const endIndex = lastElement - (lastPage * 20 - 19);
        
        ramService.getCharsPage(firstPage + filter)
            .then((data) => {
                setItemsQuantity(data.info.count);
                if(firstPage === lastPage) {
                    setChars(data.results.slice(startIndex, endIndex + 1));
                } else if(!data.info.next){
                    setChars(data.results.slice(startIndex));
                } else {
                    ramService.getCharsPage(lastPage  + filter)
                        .then((res) => {
                            setChars(
                                data.results.slice(startIndex).concat(
                                    res.results.slice(0, endIndex + 1)));
                        });
                }
            })
    };


    const handlePageClick = (e) => {
        setPage(e.selected + 1);
    };
    
    const onChangeValue = async (e) => {
        if(e.target.name === 'status')
            setStatus(e.target.value);

        if(e.target.name === 'gender')
            setGender(e.target.value);
    };

    const onApplyFiltersClick =  () => {
        setFilter('&status=' + status + '&gender=' + gender);
    };

    const onResetFiltersClick =  () => {
        setFilter('');
        Array.from( document.querySelectorAll('input[name="status"]:checked, input[name="gender"]:checked'), input => input.checked = false );
    };

    return(
        <React.Fragment>
            <Link className="char-info" to="/add">
                <button className="btn btn-add-own">Add own character</button>
            </Link>
            <section className="filters-section">
                <div className="filters-grid" onChange={onChangeValue}>
                    <div className="form-check">
                        <h2>Status</h2>
                        <div className="radio-elem">
                            <input className="radio-input" type="radio" value="alive" name="status" id="statusRadios1"/>
                            <label className="radio-label" htmlFor="statusRadios1">
                                <h4>Alive</h4>
                            </label> 
                        </div>
                        <div className="radio-elem">
                            <input className="radio-input" type="radio" value="dead" name="status" id="statusRadios2"/>
                            <label className="radio-label" htmlFor="statusRadios2">
                                <h4>Dead</h4>
                            </label>
                        </div>
                        <div className="radio-elem">
                            <input className="radio-input" type="radio" value="unknown" name="status" id="statusRadios3"/> 
                            <label className="radio-label" htmlFor="statusRadios3">
                                <h4>Unknown</h4>
                            </label> 
                        </div>
                    </div>
                    <div className="form-check">
                        <h2>Gender</h2>
                        <div className="radio-elem">
                            <input className="radio-input" type="radio" value="male" name="gender" id="genderRadios1"/>
                            <label className="radio-label" htmlFor="genderRadios1">
                                <h4>Male</h4>
                            </label>
                        </div>
                        <div className="radio-elem">
                            <input className="radio-input" type="radio" value="female" name="gender" id="genderRadios2"/>
                            <label className="radio-label" htmlFor="genderRadios2">
                                <h4>Female</h4>
                            </label>
                        </div>
                        <div className="radio-elem">
                            <input className="radio-input" type="radio" value="genderless" name="gender" id="genderRadios3"/>
                            <label className="radio-label" htmlFor="genderRadios3">
                                <h4>Genderless</h4>
                            </label>
                        </div>
                        <div className="radio-elem">
                            <input className="radio-input" type="radio" value="unknown" name="gender" id="genderRadios4"/>
                            <label className="radio-label" htmlFor="genderRadios4">
                                <h4>Unknown</h4>
                            </label>
                        </div>
                    </div>
                    <div className="form-check">
                        <button type="button" className="btn btn-apply" onClick={() => onApplyFiltersClick()}>Apply</button>
                        <button type="button" className="btn btn-reset" onClick={() => onResetFiltersClick()}>Cancel</button>
                    </div>
                </div>
            </section>

            <section className="char-cards-section">
                <div className="char-cards-grid">
                    {
                        chars.map((char) => {
                            return(<CharListItem character={char} key={char.id}/>);
                        })
                    }
                </div>
            </section>

            <section >
                <div >
                    <div className="react-paginate">
                        <ReactPaginate
                            previousLabel={'previous'}
                            previousClassName={'previous'}
                            nextLabel={'next'}
                            nextClassName={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(itemsQuantity / 12)}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={2}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default withRamService()(CharList);