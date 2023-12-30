import {useEffect, useMemo, useState} from 'react';
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadAll} from "@tsparticles/all";
import { getBlackSkyOptions } from '../IOptions/particlesConfig';

export default function TheParticles() {
    const [particlesInit, setParticlesInit] = useState<boolean>(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadAll(engine);
        }).then(() => setParticlesInit(true));
    }, []);

    const customOptions = useMemo(() => getBlackSkyOptions(), []);

    if (particlesInit) {
        return <Particles id="tsparticles" options={customOptions} className='tsparticles' />;
    }

    return <></>;
}