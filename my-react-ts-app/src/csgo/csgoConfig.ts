/**
 * CS2 settings shown on /csgo. Everything here is a plain console command,
 * so each block can be pasted into the in-game console or an autoexec.cfg.
 */

export interface SettingsSection {
  id: string;
  title: string;
  description?: string;
  /** One console command per line */
  commands: string[];
}

/** Share code from the in-game crosshair menu. Empty hides the card. */
export const CROSSHAIR_SHARE_CODE = '';

/** Steam launch options. Empty hides the card. */
export const LAUNCH_OPTIONS = '';

export const SECTIONS: readonly SettingsSection[] = [
  {
    id: 'crosshair',
    title: 'Fadenkreuz',
    commands: [
      'cl_crosshairstyle 4',
      'cl_crosshairsize 2',
      'cl_crosshairthickness 0.5',
      'cl_crosshairgap -3',
      'cl_fixedcrosshairgap -2',
      'cl_crosshairgap_useweaponvalue false',
      'cl_crosshairdot false',
      'cl_crosshair_t false',
      'cl_crosshair_drawoutline false',
      'cl_crosshair_outlinethickness 0',
      'cl_crosshaircolor 1',
      'cl_crosshaircolor_r 0',
      'cl_crosshaircolor_g 255',
      'cl_crosshaircolor_b 0',
      'cl_crosshairusealpha true',
      'cl_crosshairalpha 255',
      'cl_crosshair_recoil false',
      'cl_crosshair_dynamic_splitdist 3',
      'cl_crosshair_dynamic_splitalpha_innermod 0',
      'cl_crosshair_dynamic_splitalpha_outermod 1',
      'cl_crosshair_dynamic_maxdist_splitratio 1',
    ],
  },
  {
    id: 'viewmodel',
    title: 'Viewmodel',
    commands: [
      'viewmodel_fov 68',
      'viewmodel_offset_x 2.5',
      'viewmodel_offset_y 0',
      'viewmodel_offset_z -1.5',
      'viewmodel_presetpos 2',
    ],
  },
];

export function buildAutoexec(): string {
  const lines: string[] = ['// autoexec.cfg', ''];
  for (const section of SECTIONS) {
    lines.push(`// ${section.title}`);
    lines.push(...section.commands);
    lines.push('');
  }
  lines.push('host_writeconfig');
  return lines.join('\n');
}
