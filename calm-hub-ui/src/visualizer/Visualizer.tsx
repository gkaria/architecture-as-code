import { useEffect, useMemo, useState } from 'react';
import './Visualizer.css';
import Drawer from './components/drawer/Drawer.js';
import Navbar from '../components/navbar/Navbar.js';
import React from 'react';
import { ZoomProvider } from './components/zoom-context.provider.js';
import { CALMArchitecture } from '../../../shared/src/types.js';
import Menu from './components/menu/Menu.js';
import { useLocation } from 'react-router-dom';

function Visualizer() {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [instance, setCALMInstance] = useState<CALMArchitecture | undefined>(undefined);
    const [isConDescActive, setConDescActive] = React.useState(true);
    const [isNodeDescActive, setNodeDescActive] = React.useState(true);
    const location = useLocation();
    const data = useMemo(()=> location.state || {}, [location.state]);
    const [fileInstance, setFileInstance] = useState<string | undefined>(undefined); 
    const [fileTitle, setFileTitle] = useState<string | undefined>(undefined);

    async function handleFile(instanceFile: File) {
        setFileTitle(instanceFile.name);
        const file = await instanceFile.text();
        setFileInstance(JSON.parse(file));
    }

    useEffect(() => {
        setTitle(fileTitle ?? data?.name)
        setCALMInstance(fileInstance ?? data?.data);
      }, [fileInstance, fileTitle, data]);

    return (
        <ZoomProvider>
            <div className="h-screen flex flex-col">
                <Navbar />
                <Menu
                    handleUpload={handleFile}
                    isGraphRendered={instance ? true : false}
                    toggleNodeDesc={() =>
                        setNodeDescActive((isNodeDescActive) => !isNodeDescActive)
                    }
                    toggleConnectionDesc={() =>
                        setConDescActive((isConDescActive) => !isConDescActive)
                    }
                />
                <Drawer
                    isNodeDescActive={isNodeDescActive}
                    isConDescActive={isConDescActive}
                    calmInstance={instance}
                    title={title}
                />
            </div>
        </ZoomProvider>
    );
}

export default Visualizer;
