import $ from 'cash-dom';

import { additionalEnvs, localhostDashboardPort, localhostEditorPort, localhostPreviewerPort } from '../services/data';
import { lsSet } from '../services/ls';
import { LsKeys } from '../types';
import { showMainSection, showSettingsSection } from './tools';

const activeClass = 'active';
const envsSeparator = `,`;
const envsJoiner = `${envsSeparator} `;

const $settLink = $('#settLink');
const $settAdditionalEnvs = $('#settAdditionalEnvs');
const $settEditorPort = $('#settEditorPort');
const $settPreviewerPort = $('#settPreviewerPort');
const $settDashboardPort = $('#settDashboardPort');
const $settSave = $('#settSave');

export const initSettings = () => {
  $settAdditionalEnvs.val(additionalEnvs.join(envsJoiner));
  $settEditorPort.val(localhostEditorPort);
  $settPreviewerPort.val(localhostPreviewerPort);
  $settDashboardPort.val(localhostDashboardPort);

  $settLink.on('click', () => {
    if (!$settLink.hasClass(activeClass)) {
      showSettingsSection();
      $settLink.text('close');
      $settLink.addClass(activeClass);
    } else {
      showMainSection();
      $settLink.text('settings');
      $settLink.removeClass(activeClass);
    }
  });

  $settSave.on('click', () => {
    const envsString = ($settAdditionalEnvs.val() as string).trim();
    const envs = envsString.split(envsSeparator).reduce((acc, rawEnv) => {
      const env = rawEnv.trim();
      if (env) {
        acc.push(env);
      }
      return acc;
    }, []);
    if (envs.length) {
      lsSet(LsKeys.ADDITIONAL_ENVS, envs);
    }

    const editorPort = ($settEditorPort.val() as string).trim();
    if (editorPort) {
      lsSet(LsKeys.LOCALHOST_EDITOR_PORT, editorPort);
    }

    const previewerPort = ($settPreviewerPort.val() as string).trim();
    if (previewerPort) {
      lsSet(LsKeys.LOCALHOST_PREVIEWER_PORT, previewerPort);
    }

    const dashboardPort = ($settDashboardPort.val() as string).trim();
    if (dashboardPort) {
      lsSet(LsKeys.LOCALHOST_DASHBOARD_PORT, dashboardPort);
    }

    alert('Settings are saved!\n\nPlease open the extension again.');
    window.close();
  });
};
