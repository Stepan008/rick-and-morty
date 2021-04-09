import React from 'react';
import { RamServiceConsumer } from '../ram-service-context/ram-service-context';

const withRamService = () => (Wrapped) => {
    return (props) => {
        return (
            <RamServiceConsumer>
                {
                    (ramService) => {
                        return (
                            <Wrapped {...props} ramService={ramService}/>
                        );
                    }
                }
            </RamServiceConsumer>
        );
    }
};

export default withRamService;