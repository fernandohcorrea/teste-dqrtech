import { Command } from "commander";
import path from "path";
import fs from "fs";
import AbstractCommand from "./Base/AbstractCommand.js";

/**
 * InstallCommand
 * Class InstallCommand used for install projects dependencies
 */
export default class InstallCommand extends AbstractCommand {
  private submodules: string[] = [];

  /**
   * Constructor
   * @param program
   */
  constructor(program: Command) {
    super(program);

    program
      .command("install")
      .description("Instalação dos projetos")
      .option("-s, --silent", "Silenciar saidas", false)
      .action(async (options): Promise<void> => {
        this.silent = options.silent ? true : false;
        await this.#run();
      });
  }

  /**
   * Run steps
   */
  async #run() {
    console.time("Install Time");
    await this.#getSubModules();
    await this.#doInstallDependencies();
    await this.#doCopyEnv();
    console.timeEnd("Install Time");
  }

  /**
   * Responde por obter informações de SubModules
   */
  async #getSubModules() {
    const projectsCfg = this.config.get('projects');
    const defaultPath = projectsCfg?.default?.paths || 'projects';
    const list = projectsCfg?.list || [];
    
    for (const key in list) {
      const pj = list[key];

      if( ! pj.dirname ){
        continue;
      }

      this.submodules.push(`${defaultPath}/${pj.dirname}`)
    }

    if (this.submodules.length === 0){
      this.strOut.outDanger("Sem SubModulos");
      process.exit(1);
    }
  }

  /**
   * Init de SubModules
   */
  async #doInstallGitSubmodules() {
    this.strOut.outSession("Git SubModules Init", "info");

    const cmd = ["git submodule init", "git submodule update --merge --remote"];

    await this.shellCmd(cmd.join(" && "), true);
  }

  /**
   * Responde por Instalar as dependências(node_modules) dos SubModules
   */
  async #doInstallDependencies() {
    this.strOut.outSession(`Instalação de dependências de SubModules`, "info");

    let pkg_cfgs = this.config.get("packageManager");
    pkg_cfgs = Object.assign(
      {
        submodules: {},
      },
      pkg_cfgs
    );

    const pkg_default_cfg = Object.assign(
      {
        exec: "npm",
        install_args: [],
      },
      pkg_cfgs?.default
    );

    for (const key in this.submodules) {
      if (Object.prototype.hasOwnProperty.call(this.submodules, key)) {
        const submodule = this.submodules[key];
        
        const path_submodule = path.join(
          `${process.env.ROOT_PATH}`,
          `/${submodule}`
        );

        if (!fs.existsSync(path_submodule)) {
          this.strOut.outDanger(`Path ${path_submodule} não existe`);
          continue;
        }

        let pkg_submodule =
        Object.prototype.hasOwnProperty.call(
            pkg_cfgs.submodules,
            submodule
            ) == true
            ? pkg_cfgs.submodules[submodule]
            : {};
            pkg_submodule = Object.assign({}, pkg_default_cfg, pkg_submodule);

        const npm_submodule_path = path.join(
          path_submodule,
          "/package-lock.json"
        );

        const yarn_submodule_path = path.join(path_submodule, "/yarn.lock");

        let package_manager_type: string | null = null;

        switch (true) {
          case fs.existsSync(yarn_submodule_path):
            package_manager_type = "yarn";
            break;

          case fs.existsSync(npm_submodule_path):
            package_manager_type = "npm";
            break;

          default:
            this.strOut.outWarning(
              `Path ${path_submodule} não é node(npm|yarn)`
            );
            continue;
        }

        this.strOut.outSession(
          `== SubMolule - GIT: ${submodule.toUpperCase()} ==`,
          "success"
        );

        let cmds = [`cd ${path_submodule}`];
        cmds.push("rm -fr node_modules");

        this.strOut.outSession(
          `== SubMolule - Dependências: ${submodule.toUpperCase()} ==`,
          "success"
        );

        const extra_install_args =
          typeof pkg_submodule?.install_args == "object"
            ? pkg_submodule.install_args.join(" ")
            : "";

        switch (package_manager_type) {
          case "npm":
            cmds.push(
              `npm --prefix ${path_submodule} ${extra_install_args} install `
            );
            break;

          case "yarn":
            cmds.push(`yarn --cwd ${path_submodule} ${extra_install_args}`);
            break;

          default:
            break;
        }

        cmds.push(`cd ${process.env.ROOT_PATH}`);

        await this.shellCmdResult(cmds.join(" && "), true);
      }
    }
  }

  /**
   * Copy do .Env
   */
  async #doCopyEnv() {
    this.strOut.outSession(`Criando .ENV`);

    const select_option = ["Sim", "Não"];
    this.strOut.outWarning("ATENÇÂO:");

    let chkDotEnv = await this.questionSelect(
      "Deseja sobreescrever ou criar o arquivo .env?",
      select_option
    );

    let cmds = [`cd ${process.env.ROOT_PATH}`];

    switch (chkDotEnv) {
      case 1:
        this.strOut.outInfo("A não criado!");
        break;

      case 0:
        cmds.push("cp .env-sample .env");
        break;
      case -1:
      default:
        process.exit(1);
        break;
    }

    await this.shellCmd(cmds.join(" && "), true);
  }
}
