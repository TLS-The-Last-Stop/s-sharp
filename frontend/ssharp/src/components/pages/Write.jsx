import React from 'react';
import { WriteForm } from '../layouts/Write/index';
import Layout from '../../common/Layout';

const Write = () => {
    return (
        <Layout>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '85vh',
            }}>
                <WriteForm />
            </div>
        </Layout>
    );
};

export default Write;
