import $ from 'cash-dom';

import { FLAGS } from '../extensionFlags';
import {
	additionalEnvs,
	flagsKeys,
	localhostDashboardPort,
	localhostEditorPort,
	localhostNewEditorPort,
	localhostPreviewerPort,
	localhostViewerPort,
} from '../services/data';
import { lsSet } from '../services/ls';
import { LsKeys } from '../types';
import { showMainSection, showSettingsSection } from './tools';

const activeClass = 'active';
const envsSeparator = `,`;
const envsJoiner = `${envsSeparator} `;

const $settLink = $('#settLink');
const $settAdditionalEnvs = $('#settAdditionalEnvs');
const $settEditorPort = $('#settEditorPort');
const $settNewEditorPort = $('#settNewEditorPort');
const $settPreviewerPort = $('#settPreviewerPort');
const $settViewerPort = $('#settViewerPort');
const $settDashboardPort = $('#settDashboardPort');
const $settSave = $('#settSave');

export const initSettings = () => {
  if (!FLAGS.SHOW_NAMED_ENVS) {
    $settAdditionalEnvs.parent().hide();
  }

  $settAdditionalEnvs.val(additionalEnvs.join(envsJoiner));
  $settEditorPort.val(localhostEditorPort);
  $settNewEditorPort.val(localhostNewEditorPort);
  $settPreviewerPort.val(localhostPreviewerPort);
  $settViewerPort.val(localhostViewerPort);
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

    const newEditorPort = ($settNewEditorPort.val() as string).trim();
    if (newEditorPort) {
      lsSet(LsKeys.LOCALHOST_NEW_EDITOR_PORT, newEditorPort);
    }

    const previewerPort = ($settPreviewerPort.val() as string).trim();
    if (previewerPort) {
      lsSet(LsKeys.LOCALHOST_PREVIEWER_PORT, previewerPort);
    }

    const viewerPort = ($settViewerPort.val() as string).trim();
    if (viewerPort) {
      lsSet(LsKeys.LOCALHOST_VIEWER_PORT, viewerPort);
    }

    const dashboardPort = ($settDashboardPort.val() as string).trim();
    if (dashboardPort) {
      lsSet(LsKeys.LOCALHOST_DASHBOARD_PORT, dashboardPort);
    }

    alert('Settings are saved!\n\nPlease open the extension again.');
    window.close();
  });
};
